var McgConfig = (function () {
    function McgConfig(name, id, type, configs, files, data, source) {
        this.name = name;
        this.id = id;
        this.type = type;
        this.configs = configs;
        this.files = files;
        this.data = data;
        this.source = source;
        this.expanded = false;
        this.checked = false;
    }
    McgConfig.prototype.toggle = function () {
        this.expanded = !this.expanded;
    };
    McgConfig.prototype.getIcon = function () {
        if (this.expanded) {
            return '-';
        }
        return '+';
    };
    McgConfig.prototype.check = function () {
        this.checked = !this.checked;
        this.checkRecursive(this.checked);
    };
    McgConfig.prototype.checkRecursive = function (state) {
        this.configs.forEach(function (d) {
            d.checked = state;
            d.checkRecursive(state);
        });
    };
    return McgConfig;
})();
exports.McgConfig = McgConfig;
