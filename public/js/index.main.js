require.config({
    urlArgs: "bust=" + (new Date()).getTime()
});

requirejs(['domReady!', 'customDirectives', 'models/nav', 'models/tasks'], function (document, customDirectives, navModel, tasksModel) {

    var navApp = new Vue(navModel);    

    var tasksApp = new Vue(tasksModel);
});