# Route Mapping Rules
## Normal Rules
- `/somepath`      - Matches urls that start with `/somepath`
- `:paramName`     - Matches urls with params  
- `(/:paramName)`  - Matches urls with(or without) params  
- `*`              - Matches all characters without `/`,`?`,`&`  
- `**`             - Matches all characters without `?`,`&`  

## With `>` End
- `/somepath>`     - Matches urls that matched, and also end with `/somepath`  
- `:paramName>`    - Matches urls that with params, and also end with this param
- `(/:paramName)>` - Matches urls with(or without) params, and also end with it  
