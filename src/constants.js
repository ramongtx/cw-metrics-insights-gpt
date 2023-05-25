export const PROMPT_PREFIX = ```
This is example Metrics insights query to find the top 10 MAX EndToEndLatency metrics of namespace Cell-Alpha/Guppy/E2ECanary group by PartitionId order by MAX
"SELECT MAX(EndToEndLatency) FROM "Cell-Alpha/Guppy/E2ECanary" GROUP BY PartitionId ORDER BY MAX() DESC LIMIT 10"
Please follow the syntax and translate this to CloudWatch Metrics Insights query language: 
```
export const PROMPT_SUBFIX = " Respond with only the query."