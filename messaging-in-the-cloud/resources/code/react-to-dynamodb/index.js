const AWS = require("aws-sdk");
const sns = new AWS.SNS();

exports.reactToDynamo = async (event) => {
    await sns.publish({
        "Message": JSON.stringify(event.Records[0].dynamodb.NewImage),
        "TopicArn": process.env.TOPIC
    }).promise();
};