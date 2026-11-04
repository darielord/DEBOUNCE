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

The search currently sends one request per keystroke: 10 requests for "rick morty". The API rejects most of them with a 429. Debouncing the input should reduce this to a single request once the user stops typing.

## After debounce

I moved the timer logic into a generic `useDebounce<T>(value, delay)` hook with a 500 ms delay and a cleanup that cancels the pending timer on every new keystroke. Same test as before: "rick morty", cache disabled, network log cleared.

| Typing | Requests (before) | Requests (after)  |
| ------ | ----------------- | ----------------- |
| Fast   | 10                | 1                 |
| Slow   | 10                | one per keystroke |

Typing fast now sends a single request once the user stops. Typing slowly (about one letter per second) still sends one request per keystroke: the debounce only merges keystrokes that arrive closer together than the delay, and each pause here is longer than 500 ms. The slow capture was a partial run (7 requests for 7 characters), and runs were done close together, so the API's rate limit may have affected the status codes. That is why the table compares request counts only.

## Conclusion

Debouncing turned one request per keystroke into one request per pause for fast typing, which avoids the 429 errors from the API. It does not help when the user types slower than the delay. Next steps: handle 429 and 404 with their own messages, and add a minimum length for the search.
