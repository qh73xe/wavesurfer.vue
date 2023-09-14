import wave

import numpy as np


def write_wav(wpath, data, info):
    data = np.frombuffer(data, dtype=np.int16)
    with wave.open(str(wpath), "wb") as wf:
        wf.setnchannels(info.get("channels", 1))
        wf.setsampwidth(info.get("samplewidth", 2))
        wf.setframerate(info.get("framerate", 44100))
        wf.writeframes(data)


def create_wave(amp, f0, framerate, t):
    points = np.arange(0, framerate * t)
    return amp * np.sin(2 * np.pi * f0 * points / framerate)


if __name__ == "__main__":
    amp = 1
    framerate = 44100
    f0 = 440
    sec = 10
    outpath = "test.wav"

    data = create_wave(amp, f0, framerate, sec)

    header = dict(samplewidth=2, channels=1, framerate=framerate)
    write_wav(outpath, data, header)
