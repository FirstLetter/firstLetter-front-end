import React, {useState, useEffect} from 'react'

export const useLocalStorage = () => {

    const getItem = (item) => {
        let storage = window.localStorage
        if(typeof(storage) !== 'undefined') {
            storage.getItem(item)
        }
    }

    const setItem = ({key, value}) => {
        let storage = window.localStorage
        if(typeof(storage) !== 'undefined') {
            storage.setItem(key, value)
        }
    }

    const removeItem = (key) => {
        let storage = window.localStorage
        if(typeof(storage) !== 'undefined') {
            storage.removeItem(key)
        }
    }

    return {getItem, setItem, removeItem}

}