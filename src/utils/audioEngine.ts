/**
 * Romantic Ambient Audio Engine
 * Automatically checks for custom audio at /audio/bgm.mp3.
 * If not present, procedurally generates a soothing, gentle piano-chords & ambient strings soundscape.
 */

class RomanticAudioEngine {
  private audioCtx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private volumeNode: GainNode | null = null;
  private audioElement: HTMLAudioElement | null = null;
  private isUsingCustomAudio: boolean = false;
  private intervalId: any = null;
  private volume: number = 0.6;
  private listeners: Set<(playing: boolean) => void> = new Set();

  constructor() {
    // Attempt to prepare HTML Audio element for custom file
    if (typeof window !== 'undefined') {
      this.audioElement = new Audio();
      this.audioElement.loop = true;
      this.audioElement.volume = this.volume;
      this.audioElement.src = '/audio/bgm.mp3';

      this.audioElement.addEventListener('play', () => this.notify(true));
      this.audioElement.addEventListener('pause', () => this.notify(false));
      this.audioElement.addEventListener('error', () => {
        // Custom audio not found or format unsupported; fallback to Web Audio
        this.isUsingCustomAudio = false;
      });

      // Test whether custom file exists
      this.audioElement.load();
    }
  }

  public subscribe(listener: (playing: boolean) => void) {
    this.listeners.add(listener);
    listener(this.isPlaying);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(playing: boolean) {
    this.isPlaying = playing;
    this.listeners.forEach((fn) => fn(playing));
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public async togglePlay(): Promise<boolean> {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      await this.play();
      return true;
    }
  }

  public async play(): Promise<void> {
    // Try custom audio first
    if (this.audioElement && this.audioElement.src) {
      try {
        await this.audioElement.play();
        this.isUsingCustomAudio = true;
        this.notify(true);
        return;
      } catch {
        // If custom audio fails (e.g. 404), fall back to procedural soundscape
        this.isUsingCustomAudio = false;
      }
    }

    // Procedural Romantic Ambient Soundscape
    this.startProceduralAudio();
    this.notify(true);
  }

  public pause(): void {
    if (this.audioElement && this.isUsingCustomAudio) {
      this.audioElement.pause();
    }

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    if (this.audioCtx && this.audioCtx.state === 'running') {
      this.audioCtx.suspend();
    }

    this.notify(false);
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.audioElement) {
      this.audioElement.volume = this.volume;
    }
    if (this.volumeNode && this.audioCtx) {
      this.volumeNode.gain.setValueAtTime(this.volume * 0.15, this.audioCtx.currentTime);
    }
  }

  private initContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
      this.volumeNode = this.audioCtx.createGain();
      this.volumeNode.gain.setValueAtTime(this.volume * 0.15, this.audioCtx.currentTime);
      this.volumeNode.connect(this.audioCtx.destination);
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  private startProceduralAudio() {
    this.initContext();
    if (!this.audioCtx || !this.volumeNode) return;

    // Gentle chord progressions in D major / B minor pentatonic (warm, romantic, cinematic)
    // Notes in Hz: D4, F#4, A4, B4, C#5, D5, E5, F#5
    const scale = [293.66, 369.99, 440.0, 493.88, 554.37, 587.33, 659.25, 739.99];
    const chords = [
      [293.66, 440.0, 587.33], // D major
      [246.94, 369.99, 493.88], // B minor
      [196.0, 293.66, 440.0],  // G major
      [220.0, 329.63, 440.0],  // A major
    ];

    let chordIdx = 0;

    const playChordAndMelody = () => {
      if (!this.isPlaying || !this.audioCtx || !this.volumeNode) return;
      const now = this.audioCtx.currentTime;
      const currentChord = chords[chordIdx % chords.length];
      chordIdx++;

      // Soft sustained pad notes
      currentChord.forEach((freq) => {
        const osc = this.audioCtx!.createOscillator();
        const gain = this.audioCtx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.035, now + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.8);

        osc.connect(gain);
        gain.connect(this.volumeNode!);

        osc.start(now);
        osc.stop(now + 5.0);
      });

      // Delicate random bell/piano note on top
      const melNote = scale[Math.floor(Math.random() * scale.length)];
      const melOsc = this.audioCtx.createOscillator();
      const melGain = this.audioCtx.createGain();

      melOsc.type = 'triangle';
      melOsc.frequency.setValueAtTime(melNote, now + 0.8);

      melGain.gain.setValueAtTime(0.0001, now + 0.8);
      melGain.gain.linearRampToValueAtTime(0.04, now + 0.9);
      melGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

      melOsc.connect(melGain);
      melGain.connect(this.volumeNode);

      melOsc.start(now + 0.8);
      melOsc.stop(now + 3.4);
    };

    // Play initial chord
    playChordAndMelody();
    this.intervalId = setInterval(playChordAndMelody, 3800);
  }
}

export const soundEngine = new RomanticAudioEngine();

