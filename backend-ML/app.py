from flask import Flask, request
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.feature_extraction.text import CountVectorizer
import numpy as np
import statsmodels.api as sm
import pickle
from statsmodels.tsa.stattools import acf,pacf
from statsmodels.graphics.tsaplots import plot_acf
from statsmodels.graphics.tsaplots import plot_pacf
from sklearn.metrics import mean_squared_error
from flask_cors import CORS
import warnings

app = Flask(__name__)
CORS(app)

@app.route('/predict-category')
def predict_category():
    category = request.args['category']
    time =  request.args['time']
    #data_prep(category)
    #create_model(category)
    #predict_model(category)
    #sub_category_data_prep(category)
    return  predict_model(category, time)

@app.route('/predict-sub-category')
def predict_sub_category():
    category = request.args['category']
    time = request.args['time']
    #data_prep(category)
    #create_model(category)
    #predict_model(category)
    #sub_category_data_prep(category)
    return  predict_model(category, time)

def simple(category):
    df = pd.read_excel('Sample - Superstore.xlsx')
    df = df[['Order Date', 'Category', 'Sales']]
    df_furniture = df[df['Category'] == category]
    df_furniture.index = pd.to_datetime(df_furniture['Order Date'], format='%y-%m')
    df_furniture['year'] = df_furniture['Order Date'].apply(lambda x: x.year)
    df_furniture.sort_values(by='year')
    df_furniture.drop('Order Date', inplace=True, axis=1)
    ts_train = df_furniture[df_furniture['year'] != 2017]['Sales']
    ts_test = df_furniture[df_furniture['year'] == 2017]['Sales']
    print(ts_train)
    return  ts_train.to_json(orient='columns')

def data_prep(category):
    df = pd.read_excel('Sample - Superstore.xlsx')
    df = df[['Order Date', 'Category', 'Quantity']]
    df_technology = df[df['Category'] == category]
    df_technology.drop('Category', axis=1, inplace=True)
    df_technology.index = pd.to_datetime(df_technology['Order Date'], format='%y-%m')
    df = df_technology
    df['year'] = df.index.year
    df['month'] = df.index.month
    df1 = pd.pivot_table(df_technology, index=['year', 'month'], values=['Quantity'], aggfunc=np.sum)
    df1.to_excel(category+'.xlsx')

def create_model(category):
    df = pd.read_excel(category+'.xlsx')
    df['date'] = df['year'].astype(str) + '-' + df['month'].astype(str)
    df.index = pd.to_datetime(df['date'])
    df.drop(['year', 'month', 'date'], axis=1, inplace=True)

    ts_train = df[df.index.year != 2017]['Quantity']
    ts_test = df[df.index.year == 2017]['Quantity']
    print('train examples: ', ts_train.shape[0])
    print('test examples: ', ts_test.shape[0])

    model = sm.tsa.statespace.SARIMAX(df['Quantity'], order=(0, 1, 1), seasonal_order=(1, 1, 1, 6))
    results = model.fit()
    with open('model_'+category+'.pickle', 'wb+') as f:
        pickle.dump(results, f)

def predict_model(category, time):
    with open('model_'+category+'.pickle', 'rb+') as f:
        model = pickle.load(f)
        future = model.predict(start=49, end=int(time)+49)
        print(future)
        return  future.to_json(orient='columns')

def sub_category_data_prep(category):
    df = pd.read_excel('Sample - Superstore.xlsx')
    df = df[['Order Date', 'Sub-Category', 'Quantity']]
    df_technology = df[df['Sub-Category'] == category]
    df_technology.drop('Sub-Category', axis=1, inplace=True)
    df_technology.index = pd.to_datetime(df_technology['Order Date'], format='%y-%m')
    df = df_technology
    df['year'] = df.index.year
    df['month'] = df.index.month
    df1 = pd.pivot_table(df_technology, index=['year', 'month'], values=['Quantity'], aggfunc=np.sum)
    df1.to_excel(category+'.xlsx')

def item_data_prep(category):
    df = pd.read_excel('Sample - Superstore.xlsx')
    df = df[['Order Date', 'Product Name', 'Quantity']]
    df_technology = df[df['Product Name'] == category]
    df_technology.drop('Product Name', axis=1, inplace=True)
    df_technology.index = pd.to_datetime(df_technology['Order Date'], format='%y-%m')
    df = df_technology
    df['year'] = df.index.year
    df['month'] = df.index.month
    df1 = pd.pivot_table(df_technology, index=['year', 'month'], values=['Quantity'], aggfunc=np.sum)