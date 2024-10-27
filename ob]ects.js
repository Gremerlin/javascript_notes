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

            // создать обхект из массива парзначений с помощью Object.fromEntries .(наверное нужно для джейсона?)

            list = [["hero","batman"],["enemy","joker"]];
            obj = Object.fromEntries(list);
            console.log("создание объекта с помощь Object.fromEntries");
            console.log(obj);


 