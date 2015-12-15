export class McgConfig{

    expanded = false;
    public checked = false;

    constructor(public name:string,
                public id:string,
                public type:string,
                public configs:Array<McgConfig>,
                public files:Array<string>,
                public data,
                public source:string,
                public mfields:Array<string>,
                public dfields:Array<string>,
                public efields:Array<string>,
                public cfields:Array<string>,
                public actions:Array<string>) {
    }

    toggle(){
        this.expanded = !this.expanded;
    }

    getIcon(){

        if(this.expanded){
            return '-';
        }

        return '+';
    }

    check(){
        this.checked = !this.checked;
        this.checkRecursive(this.checked);
    }

    checkRecursive(state:boolean){
        this.configs.forEach(d => {
            d.checked = state;
            d.checkRecursive(state);
        });
    }
}
