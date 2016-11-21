
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
    ],

    init:function () {
        //Create an initial student record if one is not found within localStorage.
      if (!localStorage.daysNum){
            var _this=this;
            $.each(this.students,function (i,student) {
            for (var j = 0; j < _this.daysNum; j++) {
                student.attendance.push(_this.getRandom());
            }
        });
      localStorage.students = JSON.stringify(this.students);
      localStorage.daysNum=this.daysNum;
     }
    },

    getRandom:function () {
        return (Math.random()>=0.5);
    },

    update:function(i,j){
        var stuData = JSON.parse(localStorage.students);
        stuData[i].attendance[j]=!stuData[i].attendance[j];
        localStorage.students = JSON.stringify(stuData);
    },

    // Count a student's missed days
    countMissing:function () {
        var attendances=[],
            stuData = JSON.parse(localStorage.students);
            daysData=parseInt(localStorage.daysNum);
        $.each(stuData,function (i,student) {
            var numMissed = 0;
            for (var i = 0; i < daysData; i++) {
                if(!student.attendance[i]){
                    numMissed++;
                }
            }
            attendances.push(numMissed);
        });
        return attendances;
    },

    getAllStudents:function () {
        return JSON.parse(localStorage.students);
    },

    getDays:function () {
        return parseInt(localStorage.daysNum);
    }
};

/* ======= Octopus ======= */

var octopus={

    init:function(){
        model.init();
        view.init();
    },

    getStudents:function () {
        return model.getAllStudents();
    },

    getDaysNum:function () {
        return model.getDays();
    },

    update:function (i,j) {
        model.update(i,j);
    },

    getMissing:function () {
        return model.countMissing();
    }

};

/* ======= View ======= */
var view={
    init:function () {
        this.students=octopus.getStudents();
        this.days=octopus.getDaysNum();
        var $missedColHead=$('thead .missed-col');
            $tbody=$('tbody'),
            studentTemplate=$('script[data-template="student"]').html();
            //Insert the days in the 1st row
        for(var i=1;i<=this.days;i++){
            (function(index){
                var $th=$('<th></th>').text(i);
                $missedColHead.before($th);
            }(i));
        }
        var _this=this;
        $.each(this.students,function (i,student) {
            // Replace template markers with data
            var $thisTemplate = $(studentTemplate.replace(/{{name}}/g, student.name));
            for(var i=0;i<_this.days;i++){
                //Insert the days in the each row
                $thisTemplate.append('<td class="attend-col"><input type="checkbox"></td>');
            }
            $thisTemplate.append('<td class="missed-col">X</td>');
            $tbody.append($thisTemplate);
        });

        var $allCheckboxes = $('tbody input');

        //When a checkbox is clicked, update corresponding attendance
        $allCheckboxes.each(function (i,checkBox) {
            $(this).click(function () {
            octopus.update($(this).parents('.student').index(),$(this).parent().index()-1);
            _this.students=octopus.getStudents();
            view.render();
            });
        });

        view.render();
    },

    render:function () {
        // Check boxes, based on attendace records
        $.each(this.students,function (i,student) {
            var dayChecks = $('tbody .student').eq(i).find('input');
            dayChecks.each(function(j) {
            $(this).prop('checked', student.attendance[j]);
            });
        });
        var $allMissed = $('tbody .missed-col');
        var numMissed=octopus.getMissing();
        $allMissed.each(function(i,item) {
            $(this).text(numMissed[i]);
        });
    }
};

octopus.init();