

from flask import Flask 
from flask_restful import Api, Resource, reqparse


app = Flask(__name__)
api = Api(app)

book_put_args = reqparse.RequestParser()
book_put_args.add_argument("Name", type=str, help="Name of book")
book_put_args.add_argument("Condition", type=str, help="Condition of book")
book_put_args.add_argument("Subject", type=str, help="Subject of book")




books = {}


class Book(Resource):
    def get(self, book_id):
        return books[book_id]


    def post(self,book_id):
        args = book_put_args.parse_args()
        return {book_id: args}





api.add_resource()



if __name__ == "__main__":
    app.run(debug=True)