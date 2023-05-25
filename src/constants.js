const EXAMPLES = [
    `This is example Metrics insights query to find Top 20 AWS APIs by the number of calls in your account. 'SELECT COUNT(CallCount) FROM SCHEMA("AWS/Usage", Class, Resource, Service, Type) WHERE Type = 'API' GROUP BY Service, Resource ORDER BY COUNT() DESC LIMIT 20'`,
    `This is example Metrics insights query to find Top 10 tables by consumed reads in DynamoDB. 'SELECT SUM(ProvisionedWriteCapacityUnits) FROM SCHEMA("AWS/DynamoDB", TableName) GROUP BY TableName ORDER BY MAX() DESC LIMIT 10'`,
    `This is example Metrics insights query to find Top 10 tables by user errors. 'SELECT SUM(UserErrors) FROM SCHEMA("AWS/DynamoDB", TableName)  GROUP BY TableName ORDER BY MAX() DESC LIMIT 10'`,
    `This is example Metrics insights query to find CPU utilization of EC2 instances sorted by highest. 'SELECT AVG(CPUUtilization) FROM SCHEMA("AWS/EC2", InstanceId) GROUP BY InstanceId ORDER BY AVG() DESC'`,
    `This is example Metrics insights query to find Average CPU utilization across the all EC2 instances. 'SELECT AVG(CPUUtilization) FROM SCHEMA("AWS/EC2", InstanceId)'`,
    `This is example Metrics insights query to find Top 10 EC2 instances by highest CPU utilization. 'SELECT MAX(CPUUtilization) FROM SCHEMA("AWS/EC2", InstanceId) GROUP BY InstanceId ORDER BY MAX() DESC LIMIT 10'`,
    `This is example Metrics insights query to find Lambda functions ordered by number of invocations. 'SELECT SUM(Invocations) FROM SCHEMA("AWS/Lambda", FunctionName) GROUP BY FunctionName ORDER BY SUM() DESC'`,
    `This is example Metrics insights query to find Top 10 Lambda functions by error count. 'SELECT SUM(Errors) FROM SCHEMA("AWS/Lambda", FunctionName) GROUP BY FunctionName ORDER BY SUM() DESC LIMIT 10'`,
    `This is example Metrics insights query to find Top 10 S3 buckets by bytes downloaded. 'SELECT SUM(BytesDownloaded) FROM SCHEMA("AWS/S3", BucketName, FilterId) WHERE FilterId = 'EntireBucket' GROUP BY BucketName ORDER BY SUM() DESC LIMIT 10'`,
    `This is example Metrics insights query to find top 10 max use of CPU of EC2 instances. 'SELECT MAX(CPUUtilization) FROM "AWS/EC2" GROUP BY InstanceId ORDER BY MAX() DESC LIMIT 10'`,
    `This is example Metrics insights query to find top 20 metrics of volume total read time from ebs volume group by volume id. 'SELECT MAX(VolumeTotalReadTime) FROM "AWS/EBS" GROUP BY VolumeId ORDER BY MAX() DESC LIMIT 10'`,
    `This is example Metrics insights query to find max 20 metrics of volume write ops from ebs volume group by volume id. 'SELECT MAX("VolumeWriteOps") FROM "AWS/EBS" GROUP BY "VolumeId" ORDER BY MAX() DESC LIMIT 20'`,
    `This is example Metrics insights query to find Top 20 AWS APIs Usage by the number of calls in account. 'SELECT COUNT(CallCount) FROM "AWS/Usage" WHERE Type = 'API' GROUP BY Service, Resource ORDER BY COUNT() DESC LIMIT 20'`,
    `This is example Metrics insights query to find 20 max metrics of cpu from aws ec2 service group by id by highest. 'SELECT MAX(CPUUtilization) FROM "AWS/EC2" GROUP BY InstanceId ORDER BY MAX() DESC LIMIT 20'`,
    `This is example Metrics insights query to find top 20 avg metric of memory utilazation from ecs service group by cluster name. 'SELECT AVG(MemoryUtilization) FROM "AWS/ECS" GROUP BY ClusterName ORDER BY AVG() DESC LIMIT 20'`,
    `This is example Metrics insights query to find top 10 cpu for ec2. 'SELECT AVG(CPUUtilization) FROM "AWS/EC2" GROUP BY InstanceId ORDER BY AVG() DESC LIMIT 10'`,
    `This is example Metrics insights query to find top 10 invocations for lambda. 'SELECT SUM(Invocations) FROM "AWS/Lambda" GROUP BY FunctionName ORDER BY SUM() DESC LIMIT 10'`,
    `This is example Metrics insights query to find top 10 memory use for aws ecs. 'SELECT MAX(MemoryUtilization) FROM "AWS/ECS" GROUP BY ClusterName ORDER BY MAX() DESC LIMIT 10'`,
    `This is example Metrics insights query to find the top 10 MAX EndToEndLatency metrics of namespace Cell-Alpha/Guppy/E2ECanary group by PartitionId order by MAX. 'SELECT MAX(EndToEndLatency) FROM "Cell-Alpha/Guppy/E2ECanary" GROUP BY PartitionId ORDER BY MAX() DESC LIMIT 10'.`,
];

export const PROMPT_PREFIX = `${EXAMPLES.join(' \n')}\nPlease follow the syntax and translate this to CloudWatch Metrics Insights query language:`;
export const PROMPT_SUFFIX = "Respond with only the query.";
