
/* ======= Model ======= */

var model={
    daysNum:12,
    students:[
        {
            name:'Slappy the Frog',
            attendance:[]
        },
        {
            name:'Lilly the Lizard',
            attendance:[]
        },
        {
            name:'Paulrus the Walrus',
            attendance:[]
        },
        {
            name:'Gregory the Goat',
            attendance:[]
        },
        {
            name:'Adam the Anaconda',
            attendance:[]
        }
    ]
};

/* ======= Octopus ======= */

var octopus={

    init:function(){
        view.init();
    },

    getRandom:function () {
            return (Math.random() >= 0.5);
    },

    getStudents:function () {
        return model.students;
    }




};

/* ======= View ======= */
var view={
    init:function () {
        var students=octopus.getStudents(),
            $tbody=$('tbody');

        // grab elements and html for using in the render function
        this.studentTemplate=$('script[data-template="student"]').html();

        $.each(students,function (i,student) {

        });
    }
};