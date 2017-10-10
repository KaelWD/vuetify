const fs = require('fs')

const [
  messageFile,
  commitType,
  commitHash
] = process.env.GIT_PARAMS.split(' ')

if (commitType == null) {
  const currentMessage = fs.readFileSync(messageFile)
  const newMessage = fs.readFileSync('.github/.git_commit_msg.txt')
  fs.writeFileSync(messageFile, newMessage)
  fs.appendFileSync(messageFile, currentMessage)
} else if (commitType === 'message') {
  const currentMessage = fs.readFileSync(messageFile, 'utf8')
  if (currentMessage.startsWith('[release]')) return

  console.error('"git commit -m" is not allowed in this project')
  console.error('Please just use `git commit` and follow the template')
  process.exitCode = 1
}
