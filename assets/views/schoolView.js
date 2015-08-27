var SchoolView = function(school) {
  this.school = school;
  this.$el = $("<div class='school'></div>");
  this.render();

  $(".schools").append(this.$el);
}

SchoolView.prototype = {
  render: function() {
    var self = this;

    $("#schoolLabel").html(self.school.name)
    $("#addressLabel").html(self.school.address)

    self.school.fetchHealthReport().then(function(report){
      $("#riskLabel").html(report.riskCategory)
      $("#criticalLabel").html(report.numberCritical)
      $("#noncriticalLabel").html(report.numberNoncritical)
    })
    self.school.fetchComments().then(function(response){
      console.log(response)
      console.log(response.comments)
      self.appendComments(response.comments);
      if(response.user){
        self.appendCommentForm();
      }
    })
  },
  appendComments: function(comments) {
    var commentDiv = $("<div class='comment'></div>");
    comments.forEach(function(comment){
      var commentView = new CommentView(comment);
    })
  },
  appendCommentForm: function(){
    var commentDiv = $(".comments")
    commentDiv.append("<form class='create-comment'>");
    commentDiv.append("<input type='text' name='name' placeholder='name'>")
    commentDiv.append("<input type='text' name='body' placeholder='comment'>")
    commentDiv.append("<input type='submit'>")
    commentDiv.append("</form>")
  }
}
