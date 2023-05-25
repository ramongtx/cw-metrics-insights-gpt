const EXAMPLE_1 = `This is example Metrics insights query to find Top 20 AWS APIs by the number of calls in your account. 'SELECT COUNT(CallCount) FROM SCHEMA("AWS/Usage", Class, Resource, Service, Type) WHERE Type = 'API' GROUP BY Service, Resource ORDER BY COUNT() DESC LIMIT 20'`

const EXAMPLE_2 = `This is example Metrics insights query to find Top 10 tables by consumed reads in DynamoDB. 'SELECT SUM(ProvisionedWriteCapacityUnits) FROM SCHEMA("AWS/DynamoDB", TableName) GROUP BY TableName ORDER BY MAX() DESC LIMIT 10'`
const EXAMPLE_3 = `This is example Metrics insights query to find Top 10 tables by user errors. 'SELECT SUM(UserErrors) FROM SCHEMA("AWS/DynamoDB", TableName)  GROUP BY TableName ORDER BY MAX() DESC LIMIT 10'`

const EXAMPLE_4 = `This is example Metrics insights query to find CPU utilization of EC2 instances sorted by highest. 'SELECT AVG(CPUUtilization) FROM SCHEMA("AWS/EC2", InstanceId) GROUP BY InstanceId ORDER BY AVG() DESC'`
const EXAMPLE_5 = `This is example Metrics insights query to find Average CPU utilization across the all EC2 instances. 'SELECT AVG(CPUUtilization) FROM SCHEMA("AWS/EC2", InstanceId)'`
const EXAMPLE_6 = `This is example Metrics insights query to find Top 10 EC2 instances by highest CPU utilization. 'SELECT MAX(CPUUtilization) FROM SCHEMA("AWS/EC2", InstanceId) GROUP BY InstanceId ORDER BY MAX() DESC LIMIT 10'`

const EXAMPLE_7 = `This is example Metrics insights query to find Lambda functions ordered by number of invocations. 'SELECT SUM(Invocations) FROM SCHEMA("AWS/Lambda", FunctionName) GROUP BY FunctionName ORDER BY SUM() DESC'`
const EXAMPLE_8 = `This is example Metrics insights query to find Top 10 Lambda functions by error count. 'SELECT SUM(Errors) FROM SCHEMA("AWS/Lambda", FunctionName) GROUP BY FunctionName ORDER BY SUM() DESC LIMIT 10'`

const EXAMPLE_9 = `This is example Metrics insights query to find Top 10 S3 buckets by bytes downloaded. 'SELECT SUM(BytesDownloaded) FROM SCHEMA("AWS/S3", BucketName, FilterId) WHERE FilterId = 'EntireBucket' GROUP BY BucketName ORDER BY SUM() DESC LIMIT 10'`
const EXAMPLE_10 = `This is example Metrics insights query to find Top 10 Lambda functions by error count. 'SELECT SUM(Errors) FROM SCHEMA("AWS/Lambda", FunctionName) GROUP BY FunctionName ORDER BY SUM() DESC LIMIT 10'`

var PROMPT_PREFIX = `This is example Metrics insights query to find the top 10 MAX EndToEndLatency metrics of namespace Cell-Alpha/Guppy/E2ECanary group by PartitionId order by MAX. 'SELECT MAX(EndToEndLatency) FROM "Cell-Alpha/Guppy/E2ECanary" GROUP BY PartitionId ORDER BY MAX() DESC LIMIT 10'. `
PROMPT_PREFIX += `${EXAMPLE_1} /n ${EXAMPLE_2} /n ${EXAMPLE_3} /n ${EXAMPLE_4} /n ${EXAMPLE_5} /n ${EXAMPLE_6} /n ${EXAMPLE_7} /n ${EXAMPLE_8} /n ${EXAMPLE_9} /n ${EXAMPLE_10} /n `
PROMPT_PREFIX += `Please follow the syntax and translate this to CloudWatch Metrics Insights query language:`
const PROMPT_SUBFIX = "Respond with only the query."

export {PROMPT_PREFIX, PROMPT_SUBFIX}


