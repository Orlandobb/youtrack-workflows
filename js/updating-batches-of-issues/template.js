var entities = require('@jetbrains/youtrack-scripting-api/entities');
var search = require('@jetbrains/youtrack-scripting-api/search');

var TITLE = ''; /* Add a rule title. */
var SEARCH = ''; /* Add a search query for the issues you want to update. */
var LIMIT = 100;
var CRON = '0 * * * * ?';
var ANCHOR = ''; /* Add an id of an issue from the project you want to update. */

var updateIssue = function(ctx, issue) {
  /* Update an `issue` here. */
};

exports.rule = entities.Issue.onSchedule({
  title: TITLE,
  cron: CRON,
  search: ANCHOR,
  muteUpdateNotifications: true,
  action: function(ctx) {
    var issues = search.search(ctx.issue.project, SEARCH);
    var entries = issues.entries();
    var i = entries.next();
    var n = 0;
    var firstIssueId = i.done ? '' : i.value.id;
    
    while (n < LIMIT && !i.done) {
      var issue = i.value;
      updateIssue(ctx, issue);
      n += 1;
      i = entries.next();
    }
    
    var name = ctx.issue.project.name + ' : ' + TITLE + ' : ';
    if (n) {
      console.log(name + n + ' issues are processed, starting with ' + firstIssueId);
    } else {
      console.log(name + 'no issues are processed, as nothing is left to process');
    }
  },
  requirements: {
    /* Add rule requirements. */
  }
});
