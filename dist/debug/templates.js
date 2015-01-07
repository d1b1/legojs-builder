this["JST"] = this["JST"] || {};

this["JST"]["templates/general/about.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="row-fluid">\n\n    <div class="row">\n      <div class="col-md-12">\n\n        <div class="jumbotron">\n\t        <h2>\n              What is this site?\n\t        </h2>\n\t        <p>\n              This is a site designed (initially) to answer a question that every parent, child, and Lego Builder runs\n              into; <b>"Can I build that kit (Mellinium Falcon, Death Start etc) with the legos pieces I already have"</b>.\n\t        </p>\n\t        <p>\n              Anyone can create an account and store their \'Master List\' of products and kits. We are building\n              a \'manifest\' of all the pieces in each kit. As you tell us what kits you already own, we can tell\n              you what other kits you can make. \n\t        </p>\n\t        <p>\n              We need help! To make this site work, we need to know all the pieces in every kit. This can take some\n              work. We a have built tools to allow our users to \'complete\' a kit. As you build our your \'Master List\'\n              you will notice that some of the kits in our system are empty. This means that we need help to get \n              a complete list of all the pieces in that kit. Use the \'Build\' a kit option to get started.\n\t        </p>\n\n\t        <h2>\n              What\'s Next? \n\t        </h2>\n\t        <p>\n              Great Question! With good data comes interesting features. We have been collecting ideas \n              for how to leverage our lego data. We welcome your ideas. Below are a few of ours.\n\t        </p>\n\t        <p>\n              <b>Lego Cam</b> Imagine dumping all your legos on the floor, and using your smart phone\n              to take a photo, and getting an itimzied list of all your pieces. And then browsing this\n              site to find other interesting projects to build. \n\t        </p>\n\t        <p>\n              <b>Lego C&C</b> Imagine having a customizable build map, similiar to the paper instructions\n              you find in all the great lego kit boxes. Imagine making changes and then having a complete\n              digital copy that you can share, that others can build from and then modify again. Share \n              with your fields a photo of a lego project, your custom features, and a working instruction\n              manual.\n\t        </p>\n\t        <p>\n              <b>Lego Copier</b> Imagine you want, say, a \'Pink Melliumum Falcon\', or a red \'X-Wing Figher\',\n              simple find the kit and tell our system to convert all the pieces to the color you want. Then\n              take the new block list and order them from Lego. \n\t        </p>\n        </div>\n\n      </div>\n     \n    </div>\n\n    <div class="row hide">\n      <div class="col-md-12">\n        <i>\n               <b>How do we do it?</b> We are building a complete set of \'manifests\' for\n               all the lego kits ever made. We have a library of every brick ever made. We\n               do the work to determine what pieces you have and what you might need for\n               a new kits. And if we have the plans, you can start building. \n\t        </i>\n      </div>\n    </div>\n \n\n</div>\n';

}
return __p
};

this["JST"]["templates/general/contact.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += 'Contact INfo';

}
return __p
};

this["JST"]["templates/general/details.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="row-fluid">\n\n    <div class="row">\n      <div class="col-md-offset-3 col-md-6">\n\n        <div class="">\n          <h3>\n              Your Account\n          </h3>\n\n          <p>\n            Need to update your account. Use this form to make any changes you need.\n          </p>\n\n          <form id="detailsForm">\n            <div class="form-group">\n              <label for="name">Full Name</label>\n              <input type="text" class="form-control" value="' +
((__t = ( name )) == null ? '' : __t) +
'" name="name" id="name" placeholder="Enter your name">\n            </div>\n\n            <div class="form-group">\n              <label for="username">Username</label>\n              <input type="text" class="form-control" value="' +
((__t = ( username )) == null ? '' : __t) +
'" name="username" id="username" placeholder="Enter your username">\n            </div>\n\n            <div class="form-group">\n              <label for="email">Email address</label>\n              <input type="email" class="form-control" value="' +
((__t = ( email )) == null ? '' : __t) +
'" name="email" id="email" placeholder="Enter email">\n            </div>\n           \n            <button type="submit" class="btn btn-success saveButton">Save Changes</button>\n          </form>\n\n        </div>\n\n      </div>\n     \n    </div>\n\n</div>\n';

}
return __p
};

this["JST"]["templates/general/header.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '\n<!-- Fixed navbar -->\n    <nav class="navbar navbar-default navbar-fixed-top">\n      <div class="container">\n        <div class="navbar-header">\n          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">\n            <span class="sr-only">Toggle navigation</span>\n            <span class="icon-bar"></span>\n            <span class="icon-bar"></span>\n            <span class="icon-bar"></span>\n          </button>\n          <a class="navbar-brand" href="#">Master Builder</a>\n        </div>\n        <div id="navbar" class="navbar-collapse collapse">\n          <ul class="nav navbar-nav">\n            <li class="active"><a href="#">Home</a></li>\n            <li><a href="#products">Browse Products</a></li>\n            <li><a href="#about">About</a></li>\n\n            <li class="hide dropdown">\n              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Dropdown <span class="caret"></span></a>\n              <ul class="dropdown-menu" role="menu">\n                <li><a href="#">Action</a></li>\n                <li><a href="#">Another action</a></li>\n                <li><a href="#">Something else here</a></li>\n                <li class="divider"></li>\n                <li class="dropdown-header">Nav header</li>\n                <li><a href="#">Separated link</a></li>\n                <li><a href="#">One more separated link</a></li>\n              </ul>\n            </li>\n          </ul>\n\n          <form class="hide navbar-form navbar-left" role="search">\n            <div class="form-group">\n              <input type="text" class="form-control" placeholder="Search">\n            </div>\n            <button type="submit" class="btn btn-default">Submit</button>\n          </form>\n\n          <ul class="nav navbar-nav navbar-right">\n            ';
 if (!isLoggedIn) { ;
__p += '\n              <li class="dropdown">\n                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><b>Get Started</b>  <span class="caret"></span></a>\n                <ul class="dropdown-menu" role="menu">\n                  <li><a href="#mine">Log in</a></li>\n                   <li class="divider"></li>\n                  <li><a href="#register">Register</a></li>\n                </ul>\n              </li>\n            ';
 } else { ;
__p += '\n              <li class=" dropdown">\n                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><b>' +
((__t = ( session.name )) == null ? '' : __t) +
'</b>  <span class="caret"></span></a>\n                <ul class="dropdown-menu" role="menu">\n                  <li><a href="#mine">Your Products & Kits</a></li>\n                  <li><a href="#wish">Your Wish List</a></li>\n                  <li class="divider"></li>\n                  <li class="dropdown-header">Account Settings</li>\n                  <li><a href="#details">Details</a></li>\n                  <li><a href="#password">Password</a></li>\n                  <li><a href="#invite"><span class="glyphicon glyphicon-gift"></span> Invites</a></li>\n                  <li class="divider"></li>\n                  <li><a class="logout" href="#">Log Out</a></li>\n                </ul>\n              </li>\n            ';
 } ;
__p += '\n          </ul>\n        </div><!--/.nav-collapse -->\n      </div>\n    </nav>';

}
return __p
};

this["JST"]["templates/general/invite.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="row-fluid">\n\n    <div class="row">\n      <div class="col-md-12">\n\n        <div class="jumbotron">\n\t        <h2>\n              Invite Friends\n\t        </h2>\n\n\t        <p>\n              We are currently in beta, which really means that we are still building. So we offer\n              our initial users the option to invite some friends. Use the following options to\n              invite a friend, and to see how your friends are using the site.\n\t        </p>\n\t       \n        </div>\n\n    </div>\n\n    <div class="row">\n      <div class="col-md-offset-2 col-md-7">\n\n        <p>\n            You have 5 invites left to use. \n        </p>\n\n        <form>\n            <div class="input-group">\n              <input type="text" class="form-control" name="email" placeholder="Enter an email address">\n              <span class="input-group-btn">\n                <button class="btn btn-default" type="button">Go!</button>\n              </span>\n            </div>\n        </form>\n        <br>\n\n        <table class="table table-hover">\n          <tr>\n            <th width="55%">Email Address</th>\n            <th width="30%">Sent</th>\n            <th width="10%">Status</th>\n          </tr>\n          <tr>\n            <td>test@test.com</td>\n            <td>11/21/2014 (4 days ago)</td>\n            <td>\n              <span class="glyphicon glyphicon-ok"></span>\n            </td>\n          </tr>\n          <tr>\n            <td>test2@test.com</td>\n            <td>11/21/2014 (4 days ago)</td>\n            <td>\n              <span class="glyphicon glyphicon-unchecked"></span>\n            </td>\n          </tr>\n          <tr>\n            <td>test2@test.com</td>\n            <td>11/21/2014 (4 days ago)</td>\n            <td>\n              <span class="glyphicon glyphicon-unchecked"></span>\n            </td>\n          </tr>\n          <tr>\n            <td>test2@test.com</td>\n            <td>11/21/2014 (4 days ago)</td>\n            <td>\n              <span class="glyphicon glyphicon-ok"></span>\n            </td>\n          </tr>\n        </table>\n\n      </div>\n     \n    </div>\n\n</div>\n';

}
return __p
};

this["JST"]["templates/general/password.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="row-fluid">\n\n    <div class="row">\n      <div class="col-md-offset-3 col-md-4">\n\n        <div class="">\n          <h3>\n              Your Password\n          </h3>\n\n          <form id="passwordForm">\n            <div class="form-group">\n              <label for="password1">Enter a new Password</label>\n              <input type="password" class="form-control" value="" name="password1" id="password1" placeholder="Enter a new password">\n            </div>\n\n            <div class="form-group">\n              <label for="password2">Confirm Password</label>\n              <input type="password" class="form-control" name="password2" id="password2" placeholder="Enter your password again">\n            </div>\n\n            <button type="submit" class="btn btn-success saveButton">Save Changes</button>\n          </form>\n\n        </div>\n\n      </div>\n     \n    </div>\n\n</div>\n';

}
return __p
};

this["JST"]["templates/general/register.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="row-fluid">\n\n    <div class="row">\n      <div class="col-md-offset-3 col-md-6">\n\n        <div class="jumbotron">\n\t        <h2>\n              Want an account?\n\t        </h2>\n\n          <p>\n              If you are a child, please speak with your parent before \n              registering. Please use your parents email address.\n          </p>\n\n\t        <form id="registrationForm">\n            <div class="form-group">\n              <label for="name">Name</label>\n              <input type="text" class="form-control" name="name" id="name" placeholder="Enter your name">\n            </div>\n\n            <div class="form-group">\n              <label for="username">Username</label>\n              <input type="text" class="form-control" name="username" id="username" placeholder="Enter your username">\n            </div>\n\n            <div class="form-group">\n              <label for="email">Email address</label>\n              <input type="email" class="form-control" name="email" id="email" placeholder="Enter email">\n            </div>\n            <div class="form-group">\n              <label for="password">Password</label>\n              <input type="password" class="form-control" name="password" id="password" placeholder="Password">\n            </div>\n           \n            <button type="submit" class="btn btn-success actionButton">Create Account Now >></button>\n          </form>\n\n        </div>\n\n      </div>\n     \n    </div>\n\n    <div class="row hide">\n      <div class="col-md-12">\n        <i>\n               <b>How do we do it?</b> We are building a complete set of \'manifests\' for\n               all the lego kits ever made. We have a library of every brick ever made. We\n               do the work to determine what pieces you have and what you might need for\n               a new kits. And if we have the plans, you can start building. \n\t        </i>\n      </div>\n    </div>\n \n\n</div>\n';

}
return __p
};

this["JST"]["templates/login/form.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += ' <div class="modal-dialog" >\n    <div class="modal-content">\n\n      <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&#215;</button>\n        <h3 class="title">Login</h3>\n      </div>\n\n      <div class="modal-body padded">\n        <form class="form-horizontal" id="modalForm">\n\n              <div class="form-group">\n                 <label class="col-md-3 control-label">Username</label>\n                 <div class="col-md-7">\n                   <input type="text" class="form-control col-xs-3" value="steve" name="username">\n                 </div>\n              </div>\n\n              <div class="form-group">\n                 <label class="col-md-3 control-label">Password</label>\n                 <div class="col-md-7">\n                   <input type="password" class="form-control col-xs-3" value="test" name="password">\n                 </div>\n              </div>\n\n              <p class="text-danger" id="ModalErrorMessages"></p>\n\n        </form>\n      </div>\n\n      <div class="modal-footer">\n\n        <div class="col-md-12">\n          <button href="javascript:void(0)" class="btn btn-default" data-dismiss="modal">Cancel</button>\n          <button class="btn btn-success btn-default actionButton" data-state="open">Continue</button>\n        </div>\n\n      </div>\n\n    </div>\n  </div>\n';

}
return __p
};

this["JST"]["templates/mine/table.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += 'Here are all the pieces in this kit.\n\n<table class="table table-striped table table-hover">\n  <thead>\n    <tr>\n      <th width="5%"><img src="" alt="" /></th>\n      <th width="45%">Product Name</th>\n      <th width="25%">Theme</th>\n      <th width="15%">Pieces</th>\n      <th width="10%">&nbsp;</th>\n    </tr>\n  </thead>\n  <tbody>\n\n  </tbody>\n</table>\n';

}
return __p
};

this["JST"]["templates/mine/tr.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<td>\n  <img src="' +
((__t = ( image )) == null ? '' : __t) +
'" class="img img-polaroid">\n</td>\n<td>\n  ' +
((__t = ( name )) == null ? '' : __t) +
'\n</td>\n<td>\n  ' +
((__t = ( themeCode )) == null ? '' : __t) +
'\n</td>\n<td>\n  ' +
((__t = ( numOfPieces )) == null ? '' : __t) +
'\n</td>\n<td>\n  <button class="btn btn-default edit toggleOwnership">Own it</button>\n</td>\n';

}
return __p
};

this["JST"]["templates/pieces/tr.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<td>\n  <input type="text" value="' +
((__t = ( count )) == null ? '' : __t) +
'" class="text-center input-lg form-control count">\n</td>\n<td>\n  <img src="' +
((__t = ( brick.image )) == null ? '' : __t) +
'" class="img img-polaroid">\n</td>\n<td>\n  ' +
((__t = ( brick.name )) == null ? '' : __t) +
'\n</td>\n<td>\n  ' +
((__t = ( brick.category )) == null ? '' : __t) +
'\n</td>\n<td>\n  <button class="btn delete">x</button\n</td>\n';

}
return __p
};

this["JST"]["templates/products/table.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '\n<div class="row-fluid">\n\n    <div class="row">\n      <div class="col-md-7">\n        <p>\n            You got some legos! This is your master builders list, duh. Make sure\n            you have everything you own listed, as it will help use determine what\n            you can or can not build.\n        </p>\n      </div>  \n\n      <div class="col-md-4 pull-right">\n\n        <form id="termForm">\n            <div class="input-group">\n              <input type="text" class="form-control" name="term" placeholder="Enter a search word or words">\n              <span class="input-group-btn">\n                <button class="btn btn-success btn-default" type="button">Search</button>\n              </span>\n            </div>\n        </form>\n      </div>\n    </div>\n\n    <div class="row">\n      <div class="col-md-12">\n      <table class="table table-striped table table-hover">\n        <thead>\n          <tr>\n            <th width="5%"><img src="" alt="" /></th>\n            <th width="45%">Product Name</th>\n            <th width="25%">Theme</th>\n            <th width="15%">Pieces</th>\n            <th width="10%">&nbsp;</th>\n          </tr>\n        </thead>\n        <tbody>\n\n        </tbody>\n      </table>\n      </div>\n    </div>\n</div>\n';

}
return __p
};

this["JST"]["templates/products/tr.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<td>\n  <img src="' +
((__t = ( image )) == null ? '' : __t) +
'" class="img img-polaroid">\n</td>\n<td>\n  ' +
((__t = ( name )) == null ? '' : __t) +
'\n</td>\n<td>\n  ' +
((__t = ( themeCode )) == null ? '' : __t) +
'\n</td>\n<td>\n  ' +
((__t = ( numOfPieces )) == null ? '' : __t) +
'\n</td>\n<td>\n  <a href="#products/' +
((__t = (_id)) == null ? '' : __t) +
'" class="btn btn-default edit">Build</a>\n\n  <br>\n\n  <button class="btn btn-default edit toggleOwnership">Own it</button>\n</td>\n';

}
return __p
};

this["JST"]["templates/search/form.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<br>\n\n<form class="form-inline pull-right" role="form">\n\n  <div class="form-group">\n    <label for="searchTerm">Find a Brick</label>\n    <input type="text" class="form-control  input-lg" id="searchTerm" placeholder="Enter brick name or id or color.">\n  </div>\n\n</form>\n<br>\n<br>';

}
return __p
};

this["JST"]["templates/search/tr.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<td>\n  <img src="' +
((__t = ( image )) == null ? '' : __t) +
'" class="img img-polaroid">\n</td>\n<td>\n  ' +
((__t = ( name )) == null ? '' : __t) +
'\n</td>\n<td>\n  ' +
((__t = ( category )) == null ? '' : __t) +
'\n  </td>\n<td>\n  <button class="btn btn-default add">+</button>\n</td>\n';

}
return __p
};