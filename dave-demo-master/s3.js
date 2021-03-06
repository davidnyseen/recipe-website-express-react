const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')
const secret = require('./secret')

const region = (secret.secrets.AWS_REGION || process.env.AWS_REGION);
const bucketName = (secret.secrets.AWS_BUCKETNAME || process.env.AWS_BUCKETNAME);
const accessKeyId = (secret.secrets.AWS_ACCESS_CODE || process.env.AWS_ACCESS_CODE);
const secretAccessKey = (secret.secrets.AWS_SECRET_ACCESS_CODE || process.env.AWS_SECRET_ACCESS_CODE);
// const region = ( process.env.AWS_REGION);
// const bucketName = ( process.env.AWS_BUCKETNAME);
// const accessKeyId = ( process.env.AWS_ACCESS_CODE);
// const secretAccessKey = ( process.env.AWS_SECRET_ACCESS_CODE);
const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

// uploads a file to s3
function uploadFile(file) {
  try{
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  }

  return s3.upload(uploadParams).promise();
}
catch(err){
  console.log(err)
}
}
exports.uploadFile = uploadFile


// downloads a file from s3
function getFileStream(fileKey) {
  try{
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }

  return s3.getObject(downloadParams).createReadStream();
}
catch(err){
  console.log(err);
}
}
exports.getFileStream = getFileStream