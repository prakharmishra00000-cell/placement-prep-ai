class VocalAnalyzer {
    constructor() {
        this.audioContext = null;
        this.analyser = null;
        this.mediaStream = null;
        this.microphone = null;
        
        this.recognition = null;
        if ('webkitSpeechRecognition' in window) {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = true;
            this.recognition.interimResults = true;
        } else {
            console.warn("Speech recognition not supported in this browser.");
        }

        this.metrics = {
            totalWPM: 0,
            totalLatency: 0,
            totalFillerWords: 0,
            stressVolatility: 0,
            topicData: [] 
        };

        this.currentSession = null;
        this.isRecording = false;
        
        this.fillerRegex = /\b(um|uh|like|you know|so|basically|literally|actually)\b/gi;
    }

    async startRecording(topic, visualizerCanvas) {
        if (!this.recognition) {
            alert("Speech recognition is not supported in your browser. Please try Chrome.");
            return false;
        }
        
        try {
            this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 2048;
            this.microphone = this.audioContext.createMediaStreamSource(this.mediaStream);
            this.microphone.connect(this.analyser);
            
            this.currentSession = {
                topic: topic,
                startTime: Date.now(),
                firstWordTime: null,
                wordsCount: 0,
                fillerCount: 0,
                pitchData: [],
                transcript: ""
            };

            this.recognition.onresult = (event) => {
                if (!this.currentSession.firstWordTime) {
                    this.currentSession.firstWordTime = Date.now();
                }
                
                let interimTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        const text = event.results[i][0].transcript;
                        this.currentSession.transcript += text + " ";
                        
                        // Count words
                        const words = text.trim().split(/\s+/).filter(w => w.length > 0);
                        this.currentSession.wordsCount += words.length;
                        
                        // Count fillers
                        const fillers = text.match(this.fillerRegex);
                        if (fillers) {
                            this.currentSession.fillerCount += fillers.length;
                        }
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }
                // Update UI text input
                const inputField = document.getElementById("interview-response-input");
                if (inputField) {
                    inputField.value = this.currentSession.transcript + interimTranscript;
                }
            };

            this.recognition.start();
            this.isRecording = true;
            this.drawVisualizer(visualizerCanvas);
            this.trackPitch();
            return true;
        } catch (err) {
            console.error("Microphone access denied or error:", err);
            alert("Microphone access is required for vocal evaluation.");
            return false;
        }
    }

    stopRecording() {
        if (!this.isRecording) return null;
        
        this.isRecording = false;
        if (this.recognition) {
            try { this.recognition.stop(); } catch(e) {}
        }
        if (this.mediaStream) {
            this.mediaStream.getTracks().forEach(track => track.stop());
        }
        if (this.audioContext && this.audioContext.state !== 'closed') {
            this.audioContext.close();
        }

        const endTime = Date.now();
        const durationSec = (endTime - this.currentSession.startTime) / 1000;
        const latency = this.currentSession.firstWordTime ? (this.currentSession.firstWordTime - this.currentSession.startTime) / 1000 : durationSec;
        const wpm = (this.currentSession.wordsCount / Math.max(1, durationSec)) * 60;
        
        let stressIndex = 0;
        if (this.currentSession.pitchData.length > 0) {
            const validPitches = this.currentSession.pitchData.filter(p => p > 0);
            if (validPitches.length > 0) {
                const avgPitch = validPitches.reduce((a, b) => a + b, 0) / validPitches.length;
                let variance = 0;
                let spikes = 0;
                validPitches.forEach(p => {
                    variance += Math.pow(p - avgPitch, 2);
                    if (p > avgPitch * 1.15) spikes++; // > 15% spike
                });
                const stdDev = Math.sqrt(variance / validPitches.length);
                // Combine spike frequency and standard deviation normalized
                stressIndex = Math.min(100, Math.round((spikes / validPitches.length) * 500 + (stdDev / avgPitch) * 100));
            }
        }

        const sessionData = {
            topic: this.currentSession.topic,
            latency: latency.toFixed(2),
            wpm: Math.round(wpm),
            fillerCount: this.currentSession.fillerCount,
            stressIndex: stressIndex,
            transcript: this.currentSession.transcript.trim()
        };

        this.metrics.topicData.push(sessionData);
        
        // Update aggregates
        if (this.metrics.topicData.length > 0) {
            this.metrics.totalWPM = Math.round(this.metrics.topicData.reduce((a, b) => a + b.wpm, 0) / this.metrics.topicData.length);
            this.metrics.totalLatency = (this.metrics.topicData.reduce((a, b) => a + parseFloat(b.latency), 0) / this.metrics.topicData.length).toFixed(2);
            this.metrics.totalFillerWords = this.metrics.topicData.reduce((a, b) => a + b.fillerCount, 0);
            this.metrics.stressVolatility = Math.round(this.metrics.topicData.reduce((a, b) => a + b.stressIndex, 0) / this.metrics.topicData.length);
        }

        return sessionData;
    }

    trackPitch() {
        if (!this.isRecording || !this.analyser) return;
        
        const bufferLength = this.analyser.fftSize;
        const dataArray = new Float32Array(bufferLength);
        this.analyser.getFloatTimeDomainData(dataArray);
        
        const pitch = this.autoCorrelate(dataArray, this.audioContext.sampleRate);
        if (pitch !== -1) {
            this.currentSession.pitchData.push(pitch);
        }
        
        requestAnimationFrame(this.trackPitch.bind(this));
    }

    autoCorrelate(buf, sampleRate) {
        let SIZE = buf.length;
        let rms = 0;

        for (let i = 0; i < SIZE; i++) {
            let val = buf[i];
            rms += val * val;
        }
        rms = Math.sqrt(rms / SIZE);
        if (rms < 0.01) return -1; // Not enough signal

        let r1 = 0, r2 = SIZE - 1, thres = 0.2;
        for (let i = 0; i < SIZE / 2; i++)
            if (Math.abs(buf[i]) < thres) { r1 = i; break; }
        for (let i = 1; i < SIZE / 2; i++)
            if (Math.abs(buf[SIZE - i]) < thres) { r2 = SIZE - i; break; }

        buf = buf.slice(r1, r2);
        SIZE = buf.length;

        let c = new Array(SIZE).fill(0);
        for (let i = 0; i < SIZE; i++)
            for (let j = 0; j < SIZE - i; j++)
                c[i] = c[i] + buf[j] * buf[j + i];

        let d = 0; while (c[d] > c[d + 1]) d++;
        let maxval = -1, maxpos = -1;
        for (let i = d; i < SIZE; i++) {
            if (c[i] > maxval) {
                maxval = c[i];
                maxpos = i;
            }
        }
        let T0 = maxpos;
        return sampleRate / T0;
    }

    drawVisualizer(canvas) {
        if (!canvas || !this.isRecording) {
            if (canvas) {
                const canvasCtx = canvas.getContext("2d");
                canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
            }
            return;
        }
        const canvasCtx = canvas.getContext("2d");
        const bufferLength = this.analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        const draw = () => {
            if (!this.isRecording) {
                canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
                return;
            }
            requestAnimationFrame(draw);
            this.analyser.getByteTimeDomainData(dataArray);
            
            canvasCtx.fillStyle = 'rgba(10, 10, 20, 0.2)';
            canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
            canvasCtx.lineWidth = 2;
            canvasCtx.strokeStyle = 'rgb(0, 255, 255)';
            canvasCtx.beginPath();
            
            const sliceWidth = canvas.width * 1.0 / bufferLength;
            let x = 0;
            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0;
                const y = v * canvas.height / 2;
                if (i === 0) canvasCtx.moveTo(x, y);
                else canvasCtx.lineTo(x, y);
                x += sliceWidth;
            }
            canvasCtx.lineTo(canvas.width, canvas.height / 2);
            canvasCtx.stroke();
        };
        draw();
    }
}

window.vocalAnalyzer = new VocalAnalyzer();
