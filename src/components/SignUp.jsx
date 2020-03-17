import React, { memo, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Form from '../reusable/Form'
import { onChange } from '../redux/actions/onChangeAction'
import { submit } from '../redux/actions/formSubmitAction'
import clearFormAction from '../redux/actions/clearFormAction'
import updateUserList from '../redux/actions/updateUserList'
import validation from '../util/validation'

// let formAttributes
const SignUp = ({ formAttributes: d }) => {
    // const formAttributes = useSelector(state => state.forms.form)
    // formAttributes = formAttributes1
    const [formAttributes, setFormAttributes] = useState({ ...d })
    const isEdit = useSelector(state => state.forms.isEdit)
    const dispatch = useDispatch()

    const handleSubmit = e => {
        e.preventDefault()
        if (!isEdit) return dispatch(submit())
        return dispatch(updateUserList())
    }

    const handleChange = async (e, pattern) => {
        console.log('pattern', pattern)
        const { value, name } = e.target
        const fors = { ...formAttributes }
        fors[name].showError = !validation(pattern, value)
        // fors[name].showError = true
        console.log('validation(pattern, value)', fors[name].showError)
        setFormAttributes({ ...formAttributes, fors })
        console.log('formAttributes', formAttributes)
        dispatch(onChange(name, value))
    }

    const buttonAttributes = [
        {
            value: !isEdit ? 'Sign Up' : 'Update',
            type: 'submit',
        },
        {
            value: 'Clear',
            type: 'button',
            typeOf: 'clear',
            onClick: () => dispatch(clearFormAction()),
        }
    ]

    return (
        <Form {...{ formAttributes, handleSubmit, buttonAttributes, handleChange }} />
    )
}

export default memo(SignUp)
