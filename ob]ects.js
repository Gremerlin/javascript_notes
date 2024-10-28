            //--------------------------------------------------------------------------------------------------
            //объявление объекта, полная запись 
            //поля объвляются путем обращения к несуществующим полям объекта
            let obj = new Object();
            obj.name = "joker";
            console.log(obj);
            
            // объявление объекта сокращенная запись здесь и далее  
            obj = {};
            obj.name = "joker";
            console.log(obj);
            
            //поля объявляются внутри скобок через двоеточие
            obj ={
                name:"joker"
            };
            console.log(obj);

            // поля объвляются через внешнюю переменную.
            name = "joker";
            obj ={name};
            console.log(obj);
            
            //--------------------------------------------------------------------------------------------------
            // объявление методов объекта
            obj ={
                name:"joker",
                
                show: function(){   //обычное определение метода
                    console.log(this);
                },

                joke(){              //сокращенная запись определения метода
                    console.log('пошутил!');
                }
            }
            obj.show();
            obj.joke();

            // объявление методов и полей через массивы. в массив передает стринг, он станет именем поля. 
            // вызывать метод и поле можно также через массив по имени метода. имя метода задается стрингом
            obj ={};
            obj["name"]="batman";
            obj["kick"]= function(){
                console.log(this);
            }
            obj["kick"]();
            console.log(obj["name"]);


            // методы и поля можно объявлять в виде строк. вызываются также через массив
            obj ={
            "name":"jocker",
            "display": function(){
                console.log(this);
            },
            "бетмен и джокер сражаются": function(){
                console.log('batman and jocker fight');
            }
            }
            obj.display();
            obj["display"]();
            obj["бетмен и джокер сражаются"](); // можно использовать любые строки, даже длинные русские названия через пробел.

            // объявление полей и методов через массивы позволяет динамически менять название полей 
            function create_a_fight(who,enemy){
                obj = {
                    [who]: "красавчик",
                    [enemy] : "падла",
                
                    ["fight"] : function(){
                        console.log (who+"-"+this[who]+" и "+enemy+"-"+this[enemy]+ " сражаются");
                    }
                }
                return obj;
            }
            obj = create_a_fight("batman","joker");
            obj.fight();

            // поля можно динамически удалять. синтаксис через точку или через массив используется слово delete
            console.clear();
            obj = {
                hero:"batman",
                enemy:"jocker"
            }
            console.log(obj);
            delete obj.hero;
            delete obj["enemy"];
            console.log(obj);

            // в конструктор объекта можно передать заранее объявленные переменные со значениями
            // название переменной станет названием поля азначение перейдет понаследству.
         
            hero = "barman";
            enemy = "joker";
            fight = function(){ console.log(this)};
            obj = {hero,enemy,fight};
            console.log("передать в конструктор объвленные переменные")
            obj.fight();

            // создать обхект из массива пар-значений с помощью Object.fromEntries .(наверное нужно для джейсона?)

            list = [["hero","batman"],["enemy","joker"]];
            obj = Object.fromEntries(list);
            console.log("создание объекта с помощь Object.fromEntries");
            console.log(obj);

            //--------эксперименты со словом this------------------------------------------------------------------------------------------
            // в глобальном контексте this ссылается на объект среды выполнения, она может быть разной, например окно браузера
            // так же есть ключевое слово globalThis оно ссылаеется на объект выполнения из любого места программы

            console.log('this в глобальном контексте');
            console.log(this);
            console.log('глобальный контекст при помощи globalThis');
            console.log(globalThis);

            // в контексте функции this обращается к контекту на уровень выше, за пределы функции причем переменная оказывается это поле внешнего контекста
            // примечание. запись fight = function() равносильна function fight() только в первом случае она гарантированно затирает идентификатор fight если он был занят до этого.
            // в строгом режиме "use strict"; доступ к внешнему коетексту закрыватся
            fight = function (){
                var hero = "batman";
                console.clear();
                console.log("batman is not hero! im "+ this.hero+" is hero!");
                return this.hero;
            }
            var hero = "joker" ;
            console.log( fight());

            

            // this берет тот контекст откуда срабатывает функции. откуда функция была определена значения не имеет
            fight = "batman and joker fight";
            
            obj1 = {
                fight:"batman fight",
                show:function(){
                    console.log(this.fight)
                }
            }

            obj2 = {
                fight:"joker fight",
                show: obj1.show
            }

            funcfight = obj1.show;

            obj1.show();
            obj2.show();            
            funcfight();

            // просто жесть а если из функции вызывать другую функцию то инкапсулирование контекста не работает. хоть и кложуры есть. просто пиздец
            // еще больший пиздец если переменные через вар объявить то контекст работает правильно, на уровень выше
            // если через var то контест выходит за пределы всех функций
            var name = "joker";
            
            function func1(){
                var name = "batman";
                // name = "batman";
                function func2(){
                    // return this.name;
                    console.log(this.name);
                }
                // console.log(func2());
                func2();
            }
            func1();

            // жесткая привезка функции к контексту через спец слова call, apply
            console.clear();
            function func(){
                console.log(this.name);
            }

            var name = "joker";
            obj ={name:'batman'};

            func();
            func.apply(obj);
            const func2 = func.bind(obj); // функция bind в отличии от apply возвращает привязанную функцию
            func2();
    
            //стрелочная функция берет контектст не так как обычная функция. она какбы заимствует контекст из элемента гдле она была объявлена. применяется в objects
            console.clear();
            var name = "joker";

            obj = {
                name:"batman",
                who(){
                    return this.name;
                },
                who2:()=>{return this.name}
            }
            console.log(obj.name);
            console.log(obj.who2());
          
            // здесь тренируем вложенные ссылочные типы в объекты. это сами объекты и массивы
            // второе мы можем обращаться к элементам структуры как угодно через точку или скобки массива (.[])
            // а еще используем тут перебор через for of
            console.clear();

            obj ={
                names:["joker","batman","penguin"],
                cities:[
                    {name:"arkham",squre: 15},
                    {name:"New york",squre: 30},
                    {name:"Paris",squre: 20}
                ] 
            }

            for(i of obj.names){
                console.log(i);
            }
            
            for(i of obj["cities"]){
                console.log(i);
            }
            



