define(function () {

    var items = [
        { id: 'home', label: 'Home' },
        { id: 'tasks', label: 'Tasks' },
        { id: 'tracking', label: 'Tracking' },
        { id: 'history', label: 'History' },
        { id: 'about', label: 'About' }
    ];

    var model = {
        el: 'body > nav',
        data: {
            items: items,
            selected: null
        },
        methods: {
            select: function (item) {
                this.selected = item;
            }
        }
    };

    return model;
});