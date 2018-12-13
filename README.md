# Build a modular website

Are you tired about Content Management Systems limitations? Do you want to express your creativity but are you scared by the blank coding page?
You should start here!


## The manifesto

This project aims to enable people defining theirselves both artists and developers to express their creativity.
This project is a framework containing a set of functions, structures, concepts and conventions that could help a developer to create a custom website, without loosing control of the code underlying.
This is a modular project: each function, with its dependencies, is defined and described apart, and can be applied on each graphic template you are planning to use. 
This framework, moreover, can be installed on a php server running on each type of hosting or cloud platform.


## Structure

This project is based ona 3 layer architecture, with the web layer, the application layer and the database layer. The web layer is composed by a classic html/css/javascript structure, and can be created using any graphic template. The javascript included in this project dynamically creates and fills the structures, and it's based on a couple of functions described in the wiki pages. The php code in the application layer performs queries on the MySQL database and interacts with other Cloud Services like IBM Watson Assistant to allow Admins to speed up post drafting.

### Logical architecture
The following is the logic architecture underlying the code.

<img src="/img/architecture.png" width="800px">

### Data model
To be updated.


## Deployment


### Installation and configuration

To be updated.

### Useful Cloud Services

To deploy this solution on the Cloud you can use the following services, available via IBM Cloud:

<img src="/img/php.png" width="300px">
<img src="/img/mysql.png" width="300px">
<img src="/img/assistant.png" width="300px">

You can try also to transform the Application Layer into a "Serverless Layer" using Cloud Functions (in this case you should use a Cloud Object Storage to store images):

<img src="/img/functions.png" width="300px">

## Customization

To be updated.


## Disclaimer

This is not an official asset. It has been created by me and it's not intended for professional use. However, it follows all guidelines you can find in https://console.bluemix.net/docs/services/conversation/ and in https://www.ibm.com/watson/developercloud/assistant/api/v1/. For Watson Services SLAs, please have a look here: https://www-03.ibm.com/software/sla/sladb.nsf/sla/bm-0038-09. Video tutorial linked are not official assets.


## License

This project uses the Apache License Version 2.0 software license. https://github.com/lucacrippa88/build-modular-website/blob/master/LICENSE
