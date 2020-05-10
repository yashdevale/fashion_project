from flask import Flask,jsonify,request
from flask_cors import CORS
from flask_pymongo import PyMongo
import base64
import label2

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/fashion"
mongo = PyMongo(app)
CORS(app)


@app.route('/classifyimage',methods=["POST"])
def addMovie():   

    movie = request.get_json()
    imageBase64 = movie["image"]
    with open("imageToSave.jpg", "wb") as fh:
        fh.write(base64.b64decode(str(imageBase64)))
        fh.close()
    predictions,label = label2.tensorflow('imageToSave.jpg')
    label = label.title().replace("2","")
    results= list(mongo.db.products.find({"$or":[{"articleType":label},{"masterCategory":label},{"subCategory":label}]}))
    print(results)
    print(predictions)
    return jsonify(predictions)   


if __name__=="__main__":
    app.run(debug=True)