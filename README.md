# Run Ghost Inspector Suite 

Run a Ghost Inspector Suite that only passes if both assertions and screenshots don't fail.

## Inputs

### `suiteID`
**Required** ghost inspector suiteID.\

### `GHOST_INSPECTOR_API_KEY`
**Required** ghost inspector API Key\

### `vercelPreviewURL`
**Required** Vercel preview URL, including `https://`

### `maxTimeout`
optional timeout in milliseconds. how long to wait for tests results before failing\
default: "300000"


## Outputs

### `startURL`
optional startURL for the test suite\
default: ''

### `maxTimeout`
optional timeout in milliseconds. how long to wait for tests results before failing\
default: "300000"


## Example usage

```yml
uses: propeller-team/run-ghost-inspector-suite-action@v1.0.1
with:
  suiteID: ${{ secrets.GHOST_INSPECTOR_SUITE_ID }}
  vercelPreviewURL: "https://xxxx.vercel.app"
  GHOST_INSPECTOR_API_KEY: ${{ secrets.GHOST_INSPECTOR_API_KEY }}
```
