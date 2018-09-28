var id = 0;

function nextId() {
    id++;
    return 'p' + id;
}

function List(name, status) {
    this.id = nextId();
    this.name = name;
    this.status = status;
}

var lists = [
    new List('vue.js', '熟练'),
    new List('react.js', '熟练')
];

module.exports = {
    getLists: () => {
        return lists;
    },
    getList: (id) => {
        for (var i = 0; i < lists.length; i++) {
            if (lists[i].id === id) {
                return lists[i];
            }
        }
        return null;
    },
    createList: (name, status) => {
        var item = new List(name, status);
        lists.push(item);
        return item;
    },
    updateList:(id,name,status) => {
        var item;
        for (var i = 0; i < lists.length; i++) {
            if (lists[i].id === id) {
                lists[i].name = name;
                lists[i].status = status;
                item = lists[i];
                break;
            }
        }
        return item;
    },
    deleteList: (id) => {
        var index = -1;
        for (var i = 0; i < lists.length; i++) {
            if (lists[i].id === id) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            return lists.splice(index, 1)[0];
        }
        return null;
    }
};
