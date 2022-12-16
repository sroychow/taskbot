const labeler = require('./src/labeler')
/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  // Your code here
  app.log.info("Yay, the app was loaded!");

  app.on("issues.opened", async (context) => {
    const issueComment = context.issue({
      body: "Thanks for opening this issue!",
    });
    return context.octokit.issues.createComment(issueComment);
  });
  
  // "Labeler" - Add Labels on PRs
  app.on([
    'pull_request.opened',
    'pull_request.reopened',
    'pull_request.edited',
    'pull_request.synchronize'], async context => {
    const config = await utils.getConfig(context)
    await labeler.addLabelsOnPr(context, config)
    //for additional labels
    commands(app, 'type', (context, command) => {
      const labels = command.arguments.split(/,*/)
      return context.github.issues.addLabels(context.issue({labels}))
      
    })
  })

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
