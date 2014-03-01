function handleFileSelect(evt) {
                        var original = document.getElementById("original"),
                                stego = document.getElementById("stego"),
                                img = document.getElementById("img"),
                                onto = document.getElementById("onto"),
                                message = document.getElementById("message");
                        if(!original || !stego) return;
                        
                        var files = evt.target.files; 

                        for (var i = 0, f; f = files[i]; i++) {


                                if (!f.type.match('image.*')) {
                                        continue;
                                }

                                var reader = new FileReader();

                                reader.onload = (function(theFile) {
                                        return function(e) {
                                                img.src = e.target.result;
                                                img.title = escape(theFile.name);
                                                stego.className = "half invisible";
                                                onto.src = "";
                                                message.innerHTML="";
                                                message.parentNode.className="invisible";
                                                updateCapacity();
                                        };
                                })(f);


                                reader.readAsDataURL(f);
                        }
                }
               
                function hide() {
                        var stego = document.getElementById("stego"),
                                img = document.getElementById("img"),
                                onto = document.getElementById("onto"),
                                message = document.getElementById("message"),
                                textarea = document.getElementById("text"),
                                download = document.getElementById("download");
                        if(img && textarea) {
                                onto.src = steg.encode(textarea.value, img, {"width": img.width, "height": img.height});
                                stego.className = "half";
                                message.innerHTML="";
                                message.parentNode.className="invisible";
                                download.href=onto.src.replace("image/png", "image/octet-stream");
                        }
                }
                
                function read() {
                        var img = document.getElementById("img"),
                                onto = document.getElementById("onto"),
                                message = document.getElementById("message"),
                                textarea = document.getElementById("text");
                        if(img && textarea) {
                                message.innerHTML = steg.decode(img);
                                if(message.innerHTML !== "") {
                                        message.parentNode.className="";
                                        textarea.value = message.innerHTML;
                                        updateCapacity();
                                }
                        }
                }

                
                
                function updateCapacity() {
                        var img = document.getElementById('img'),
                                textarea = document.getElementById('text');
                        if(img && text)
                                document.getElementById('capacity').innerHTML='('+textarea.value.length + '/' + steg.getHidingCapacity(img) +' chars)';
                }
        
                window.onload = function(){
                        document.getElementById('file').addEventListener('change', handleFileSelect, false);
                        document.getElementById('hide').addEventListener('click', hide, false);
                        document.getElementById('read').addEventListener('click', read, false);
                        document.getElementById('text').addEventListener('keyup', updateCapacity, false);
                        hide();
                        updateCapacity();
                };
