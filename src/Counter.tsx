import React from 'react'
import type { RootState } from './store'
import { useSelector, useDispatch } from 'react-redux'
import {actions} from './counterSlice'

export function Counter() {
    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch()

    return (
        <div>
            <div>
                <button onClick={() => dispatch(actions.increment())} >increment</button>
                <button onClick={() => {
                    // @ts-ignore
                    dispatch(actions.fetchUserById("some_user_id"))
                }} >fetch user data</button>
                <span>{count}</span>
                <button onClick={() => dispatch(actions.decrement())} >decrement</button>
            </div>
        </div>
    )
}
