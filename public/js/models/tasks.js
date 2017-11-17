define(function () {

    var tasks = [
        { id: '1', description: 'wake up' },
        { id: '2', description: 'learn javascript' },
        { id: '3', description: 'build a web site' },
        { id: '4', description: 'cry' },
        { id: '5', description: 'go to bed' }
    ];

    var model = {
        el: 'section#tasks',
        data: {
            tasks: tasks
        },
        methods: {

        }
    };

    return model;
});