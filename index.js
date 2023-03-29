
$(document).ready(function () {

  // Variable(s) =============================================
    var livedateTime;
    var inputTaskStat = false;
    var inputDueDateStat = false;
    var noTasksMsg = $('#NoTasks');
    var taskCount;
  
  // Selector(s) =============================================
    var dateTime = $('#DateTime');

  // jQuery AJAX 'GET' JSON and update #ToDoList =============
    $.ajax({

      type: 'GET',
    
      url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=139',
    
      dataType: 'json',
    
      success: function (response, textStatus) {
    
        console.log(response); // response is a parsed JavaScript object instead of raw JSON
        var json = response;

        if (json.Error) {

          console.log("json.Error");
          var errorMsg = () => {

            var msg = $('<div class="row"> \
                            <h1>JSON Error...</h1> \
                            </div>').hide().fadeIn(700, "swing");

            $('#ToDoList').prepend(msg);

          };
          errorMsg();

        } else {

          if (json.tasks.length === 0) {

            console.log("No tasks in JSON...");
            $(noTasksMsg).hide().fadeIn(700);

          } else {

            // place all 'task'(s) in #ToDoList
            for (i= 0; i <= (json.tasks.length - 1); i++) {

              // variables
              var content = json.tasks[i].content;
              var created = json.tasks[i].created_at;
              var createdOn = created.replace(/T/g, " ").slice(0, 19);
              var due = json.tasks[i].due;
              var dueBy = due.replace(/T/g, " ").slice(0, 19);
              var jsonID = json.tasks[i].id;
              var completedStatus = json.tasks[i].completed;
              var cmpltd = json.tasks[i].updated_at;
              var cmpltdDandT = cmpltd.replace(/T/g, " ").slice(0, 19);

              var addNext = () => {

                var taskDiv = 
                $('<div id="'+jsonID+'" class="task mb-2 py-2"> \
                      \
                      <div class="row mb-3"> \
                        <div class="col text-center"> \
                          <h5 id="ListItem" class="fw-bold mb-0"> \
                          </h5> \
                        </div> \
                      </div> \
                      \
                      <div class="row mb-3"> \
                        <div class="col text-end"> \
                          <p7 class="fw-light"> \
                            Completed on (DST N/A):  \
                            <br> \
                            <span id="CompletedDateTime" class="text-success"> \
                            </span> \
                          </p7> \
                        </div> \
                        <div class="col text-center"> \
                          <p7 class="fw-light"> \
                            Created on (DST N/A):  \
                            <br> \
                            <span id="CreatedOn" class="text-info"> \
                            </span> \
                          </p7> \
                        </div> \
                        <div class="col"> \
                          <p7 class="fw-light"> \
                            Due by (local time):  \
                            <br> \
                            <span id="DueBy" class="text-warning"> \
                            </span> \
                          </p7> \
                        </div> \
                      </div> \
                      \
                      <div class="row"> \
                        <div class="col text-center"> \
                          <button id="CompleteBtn" class="me-3"> \
                            Click to Complete \
                          </button> \
                          <button id="RemoveBtn"> \
                            Remove \
                          </button> \
                        </div> \
                      </div> \
                    </div> \
                ');

                // add task to 'ToDoList'
                $('#ToDoList').prepend(taskDiv).hide().fadeIn(777);

                if (completedStatus === false) {

                  $('#CompleteBtn').css("display", "inline-block");

                } else if (completedStatus === true) {

                  // add time to '#CompletedDateTime'
                  $('#CompletedDateTime').html((cmpltdDandT));

                } else {};
                
                // add 'content' to '#ListItem'
                $('#ListItem').html(content);
                // add 'created_at' to '#CreatedOn'
                $('#CreatedOn').html(createdOn);
                // add 'dueBy' to '#DueBy'
                $('#DueBy').html(dueBy);

              };
              addNext();

            };

            // update task counter
            $('#TaskCounter').html(json.tasks.length);

          };

        };
    
      },
    
      error: function (request, textStatus, errorMessage) {
    
        console.log(errorMessage);
    
      }
    
    });

  // Method(s) ===============================================
    var addTask = function() {

      var taskDiv = $('<div id="" class="task mb-2 py-2"> \
            <div class="row mb-3"> \
              <div class="col text-center"> \
                <h5 id="ListItem" class="fw-bold mb-0"> \
                </h5> \
              </div> \
            </div> \
            <div class="row mb-3"> \
              <div class="col text-end"> \
                <p7 class="fw-light"> \
                  Completed on (DST N/A):  \
                  <br> \
                  <span id="CompletedDateTime" class="text-success"> \
                  </span> \
                </p7> \
              </div> \
              <div class="col text-center"> \
                <p7 class="fw-light"> \
                  Created on (DST N/A):  \
                  <br> \
                  <span id="CreatedOn" class="text-info"> \
                  </span> \
                </p7> \
              </div> \
              <div class="col"> \
                <p7 class="fw-light"> \
                  Due by (local time):  \
                  <br> \
                  <span id="DueBy" class="text-warning"> \
                  </span> \
                </p7> \
              </div> \
            </div> \
            <div class="row"> \
              <div class="col text-center"> \
                <button id="CompleteBtn" class="me-3"> \
                  Click to Complete \
                </button> \
                <button id="RemoveBtn"> \
                  Remove \
                </button> \
              </div> \
            </div> \
          </div> \
      ');
      // add taskDiv to 'ToDoList'
      $('#ToDoList').prepend(taskDiv).hide().fadeIn(777);

    };

    // Live date and time
    var liveDateTime = () => {

      dateTime.html(Date($.now()).slice(0,24)).hide().fadeIn(1777, "swing");

      setTimeout (() => {

        setInterval(() => {

        dateTime.html(Date($.now()).slice(0,24));
        livedateTime = Date($.now()).slice(0,24);

        }, 995);

      }, 1777);

    };
    liveDateTime();
 
  // Event Listeners ============================================
    $(document).on('input', '#InputTask', function() {

      if ($('#InputTask').val().length > 0) {

        inputTaskStat = true;

      } else {inputTaskStat = false;};

    });

    $(document).on('input', '#InputDueDate', function() {

      if ($('#InputDueDate').val().length === 21) {

        inputDueDateStat = true;

      } else {inputDueDateStat = false;};

    });

    $(document).on('click', '#SubmitBtn', function() {
      
      var inputTask = $('#InputTask').val();
      var contentTask = inputTask.charAt(0).toUpperCase() + inputTask.slice(1);

      if (inputTaskStat && inputDueDateStat === true) {

        // 'POST' to API
        $.ajax({

          type: 'POST',
          url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=139',
          contentType: 'application/json',
          dataType: 'json',
          data: JSON.stringify({

            task: {

              content: contentTask,
              due: $('#InputDueDate').val()

            }

          }),

          success: function (response, textStatus) {

            console.log(response);

          },
          error: function (request, textStatus, errorMessage) {

            console.log(errorMessage);

          }

        });

        if (noTasksMsg) {

          $(noTasksMsg).fadeOut(777);

        } else {};

        // run addTask
        addTask();

        setTimeout(() => {

          // 'GET' from API and update
          $.ajax({

            type: 'GET',
          
            url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=139',
          
            dataType: 'json',
          
            success: function (response, textStatus) {
          
              console.log(response); // response is a parsed JavaScript object instead of raw JSON

              var json = response;

              if (json.Error) {

                console.log("json.Error");
                var errorMsg = () => {

                  var msg = $('<div class="row"> \
                                <h1>JSON Error...</h1> \
                                </div>').hide().fadeIn(700, "swing");

                  $('#ToDoList').prepend(msg);

                };
                errorMsg();

              } else {

                // variables
                var index = ((json.tasks.length) - 1);
                var parent = $('#ToDoList').children('.task')[0];
                var content = json.tasks[index].content;
                var completedStatus = json.tasks[index].completed;
                var created = json.tasks[index].created_at;
                var createdOn = created.replace(/T/g, " ").slice(0, 19);
                var due = json.tasks[index].due;
                var dueBy = due.replace(/T/g, " ").slice(0, 19);
                var jsonID = json.tasks[index].id;

                var addTo = () => {

                  // add 'jsonID' to id attr
                  $(parent).attr("id", jsonID);
                  // add content to #ListItem
                  $('#ListItem').html(content);
                  // add 'created_at' to '#CreatedOn'
                  $('#CreatedOn').html(createdOn);
                  // add 'dueBy' to '#DueBy'
                  $('#DueBy').html(dueBy);

                  if (completedStatus === false) {

                    $('#CompleteBtn').css("display", "inline-block");

                  } else if (completedStatus === true) {

                    // add time to '#CompletedDateTime'
                    $('#CompletedDateTime').html((cmpltdDandT));

                  } else {};

                };
                addTo();

              };

              // update task counter
              $('#TaskCounter').html(json.tasks.length).hide().fadeIn();
          
            },
          
            error: function (request, textStatus, errorMessage) {
          
              console.log(errorMessage);
          
            }
          
          });

        }, 700);

      } else {

        if (inputDueDateStat === false && inputTaskStat === false) {

          alert("Both Task and Due Date must be completed precisely!\nIf both formats are correct: delete and a character.");

        } else if (inputDueDateStat === false) {

          alert("Due Date/Time must be in exact format: 'Sun March 24 09:00:00'!\nIf format is correct: Delete and a character.");

        } else if (inputTaskStat === false) {

          alert("Task must not be empty!\nIf format is correct: Delete and a character.");

        } else {};
    
      };

    });

    $(document).on('click', '#CompleteBtn', function() {

      var parent = $(this).closest('.task');
      var parentID = $(parent).attr("id");

      // jQuery AJAX 'PUT' request
      $.ajax({

        type: 'PUT',
        url: 'https://fewd-todolist-api.onrender.com/tasks/'+parentID+'/mark_complete?api_key=139',
        contentType: 'application/json',
        dataType: 'json',

        success: function (response, textStatus) {

          console.log(response);

        },
        error: function (request, textStatus, errorMessage) {

          console.log(errorMessage);

        }

      });

      // remove button
      $(this).fadeOut(777);
      // selector
      var cmpltDandT = $(parent).find('#CompletedDateTime').hide().fadeIn(777);
      // add time to selector
      $(cmpltDandT).html(Date($.now()).slice(0,24));

    });

    $(document).on('click', '#RemoveBtn', function () {

      var parent = $(this).closest('.task');
      var parentID = $(parent).attr("id");

      // jQuery AJAX 'DELETE' request
      $.ajax({

        type: 'DELETE',
        url: 'https://fewd-todolist-api.onrender.com/tasks/'+parentID+'?api_key=139',
        success: function (response, textStatus) {

          console.log(response);

        },
        error: function (request, textStatus, errorMessage) {

          console.log(errorMessage);

        }

      });

      $(parent).fadeOut(777);

      // jQuery AJAX 'GET' request for console update
      setTimeout(() => {
        
        $.ajax({

          type: 'GET',
        
          url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=139',
        
          dataType: 'json',
        
          success: function (response, textStatus) {
        
            console.log(response); // response is a parsed JavaScript object instead of raw JSON
            var json = response;

            if (json.Error) {

              console.log("json.Error");
              var errorMsg = () => {
    
                var msg = $('<div class="row"> \
                                <h1>JSON Error...</h1> \
                                </div>').hide().fadeIn(700, "swing");
    
                $('#ToDoList').prepend(msg);
    
              };
              errorMsg();
    
            } else {
    
              if (json.tasks.length === 0) {
    
                console.log("No tasks in JSON...");
                $(noTasksMsg).fadeIn(700, "swing");
                
        
              } else {};

              // update task counter
              $('#TaskCounter').html(json.tasks.length);
          
            };
          
          },
        
          error: function (request, textStatus, errorMessage) {
        
            console.log(errorMessage);
        
          }

        });

        $(parent).remove();
        
      }, 777);

    });

    $(document).on('click', '#AllBtn', function () {
      
      if ($(noTasksMsg).show()) {

        $(noTasksMsg).hide();
 
      } else {};

      for (i = 0; i < $('.task').length; i++) {

        var child = $('#ToDoList').children().eq(i);

        if ($(child).hide()) {

          $(child).show();

        } else {continue;}

      };

      // update task counter
      $('#TaskCounter').html($('.task').length);

    });
    
    /*$(document).on('click', '#ActiveBtn', function () {



    });*/

    $(document).on('click', '#CmpltdBtn', function () {

      if ($(noTasksMsg).show()) {

        $(noTasksMsg).hide();
 
      } else {};

      for (i = 0; i <= $('.task').length; i++) {

        $('#ToDoList').children().eq(i).hide();
        continue;

      };

      $.ajax({

        type: 'GET',
      
        url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=139',
      
        dataType: 'json',
      
        success: function (response, textStatus) {
      
          console.log(response); // response is a parsed JavaScript object instead of raw JSON
          var json = response;

          if (json.Error) {

            console.log("json.Error");
            var errorMsg = () => {
  
              var msg = $('<div class="row"> \
                              <h1>JSON Error...</h1> \
                              </div>').hide().fadeIn(700, "swing");
  
              $('#ToDoList').prepend(msg);
  
            };
            errorMsg();
  
          } else {

            var idsCount = [];

            for (i = 0; i < json.tasks.length; i++) {

              var completedStatus = json.tasks[i].completed;
              var jsonID = json.tasks[i].id;

              if (completedStatus === true) {

                idsCount.push(jsonID);
                $('#'+jsonID+'').show();

              } else {continue;};

            };

            if (idsCount.length === 0) {

              console.log("No 'Completed' tasks...");
              $(noTasksMsg).fadeIn(700);

            } else {};

            // update task counter
            $('#TaskCounter').html(idsCount.length);

          };
        
        },
      
        error: function (request, textStatus, errorMessage) {
      
          console.log(errorMessage);
      
        }

      });

    });

});
