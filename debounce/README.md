# Debounce

## Problem

One request per keystroke. API answers 429 when typing too fast.

## How I measured

I opened the Network tab, disabled the cache, cleared the log, and typed "rick morty".

## Results

Typing "rick morty" with the cache disabled and the network log cleared before each run:

| Typing | Requests | Canceled | 200 | 429 | 404 |
| ------ | -------- | -------- | --- | --- | --- |
| Fast   | 10       | 0        | 2   | 8   | 0   |
| Slow   | 10       | 0        | 2   | 6   | 2   |

Both runs sent one request per keystroke. The runs were done back to back, so the rate limit carried over between them.

## Conclusion

## Conclusion

The search currently sends one request per keystroke: 10 requests for "rick morty". The API rejects most of them with a 429. Debouncing the input should reduce this to a single request once the user stops typing.
