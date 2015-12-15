var A1_Mind = {"name":"A1-Mind"};
var temp={};

describe("Jassplan TO-DO REST API Version 16", function() {

    describe("GET /", function() {
        it("returns project name", function(done) {
            $.get("/", function(data, textStatus, jqXHR) {
                expect(data).toBe("Jassplan TO-DO REST API Version 16");
                done();
            });
        });
    });

    describe("DEL /todo", function() {
        it("drops a possible todo db for user 'test'", function(done) {
            $.ajax(
                {   url:"/todo",
                    type:"DELETE",
                    success:function(data, textStatus, jqXHR) {
                                var emptyArray = [];
                                expect(data).toBeDefined();
                                done();}
                });
        });
    });

    describe("GET /todo", function() {
        it("returns empty todo list the first time, after db was dropped", function(done) {
            $.get("/todo", function(data, textStatus, jqXHR) {
                var emptyArray = [];
                expect(data).toBeDefined();
                expect(data.data).toBeDefined();
                expect(data.data.length).toBe(0);
                done();
            });
        });
    });

    describe("POST /todo", function() {
        it("creates a todo collection for test user and adds a first item", function(done) {
            $.ajax({
                url: "/todo",
                type:"POST",
                data: "{\"name\":\"A1-Mind\"}",
                contentType:"application/json",
                success: function(data, textStatus, jqXHR) {
                    console.log("From post: " + JSON.stringify(data,null,2));
                    temp = data.data.ops[0];
                    temp.name = "A1-Mind2";
                    var emptyArray = [];
                    expect(data).toBeDefined();
                    expect(data.data).toBeDefined();
                    expect(data.data.ops.length).toBe(1);
                    done();}
            });
        });
    });
    
    
    describe("GET /todo", function() {
        it("returns a todo list with one item, as  posted before", function(done) {
            $.get("/todo", function(data, textStatus, jqXHR) {
                var emptyArray = [];
                expect(data).toBeDefined();
                expect(data.data).toBeDefined();
                expect(data.data.length).toBe(1);
                expect(data.data[0].name).toBe("A1-Mind");
                done();
            });
        });
    });

    describe("PUT /todo", function() {
        it("creates a todo collection for test user and adds a first item", function(done) {
            $.ajax({
                url: "/todo",
                type:"PUT",
                data: JSON.stringify(temp),
                contentType:"application/json",
                success: function(data, textStatus, jqXHR) {
                    console.log("From put: " + JSON.stringify(data,null,2));
                    var emptyArray = [];
                    expect(data).toBeDefined();
                    expect(data.data).toBeDefined();
                    expect(data.status).toBe('ok');
                    done();}
            });
        });
    });

    describe("GET /todo", function() {
        it("returns a todo list with one item, as  posted before", function(done) {
            $.get("/todo", function(data, textStatus, jqXHR) {
                var emptyArray = [];
                expect(data).toBeDefined();
                expect(data.data).toBeDefined();
                expect(data.data.length).toBe(1);
                expect(data.data[0].name).toBe("A1-Mind2");
                done();
            });
        });
    });

    describe("DEL /todo", function() {
        it("drops a possible todo db for user 'test'", function(done) {
            $.ajax(
                {   url:"/todo",
                    type:"DELETE",
                    success:function(data, textStatus, jqXHR) {
                        var emptyArray = [];
                        expect(data).toBeDefined();
                        done();}
                });
        });
    });

    describe("POST /todo", function() {
        it("creates a first genie spec", function(done) {
            $.ajax({
                url: "/todo",
                type:"POST",
                data: "{\"name\":\"Mc Genie Sample 1\",\"id\":\"app\",\"type\":\"app\",\"configs\":[{\"name\":\"Header...\",\"id\":\"header\",\"type\":\"header\",\"configs\":[],\"files\":[],\"data\":null,\"source\":null,\"expanded\":false,\"checked\":false},{\"name\":\"List...\",\"id\":\"list1\",\"type\":\"list\",\"configs\":[],\"files\":[],\"data\":[{\"Name\":\"device1\",\"Path\":\"android\"},{\"Name\":\"device2\",\"Path\":\"iphone\"},{\"Name\":\"device3\",\"Path\":\"windows\"}],\"source\":\"devicegroups\",\"expanded\":false,\"checked\":false},{\"name\":\"Footer...\",\"id\":\"footer\",\"type\":\"footer\",\"configs\":[],\"files\":[],\"data\":null,\"source\":null,\"expanded\":false,\"checked\":false}],\"files\":[],\"data\":null,\"source\":null,\"expanded\":false,\"checked\":false}",
                contentType:"application/json",
                success: function(data, textStatus, jqXHR) {
                    var emptyArray = [];
                    expect(data).toBeDefined();
                    expect(data.data).toBeDefined();
                    done();}
            });
        });
    });


});
