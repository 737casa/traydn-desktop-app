import React, {FormEvent, useCallback, useEffect, useState} from "react";
import {getLid} from "../helpers";
import {Form2,createFields, createFormInputs, createHandleSubmit,Table2} from "@7casa/clib22-helpers";

export default function Instruments(){


    const {
        get,put,post,del
    } = window.api.createCrud("instruments","")

    const cols = [
        {
            Header: 'Instruments',
            columns: [
                {
                    Header:"Name",
                    accessor:"name",
                },
            ],
        }
    ]

    const fields = createFields([
        "name",
    ],{allRequired:true, bulk:true})

    const instrumentFormConfig = {
        inputs:createFormInputs(fields),
        handleSubmit:createHandleSubmit({
            async onCreate(data){
                await post(data)
            },
            async onEdit(data){
                await put(data.id, data)
            }
        })
    }

    return (
        <>
            <Table2
                cols={cols}
                get={get}
                put={put}
                update={false}
                del={del}
                post={post}
                form={
                    ({data,cleanup}) => <Form2 data={data} cleanup={cleanup} {...instrumentFormConfig} />
                }
            />

        </>
    )
}