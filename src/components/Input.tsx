import React, { ChangeEventHandler, Dispatch, FocusEventHandler, KeyboardEventHandler, SetStateAction, useContext, useEffect, useState } from 'react'
import { Country } from '../lib/country'
import localeList from "../i18n/messages";
import { LocaleContext } from '../i18n/LocaleContext';
const countryData: Country[] = require("../data/country_data.json").features;

type Props = {
    value: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
    win: boolean,
    guesses: Country[]
}

export default function Input(props: Props) {
    const { locale } = useContext(LocaleContext);
    const [open, setOpen] = useState(false);
    const [hints, setHints] = useState<string[]>([]);
    const [selected, setSelected] = useState<number>(0);

    const numHints = 3;

    useEffect(() => {
        const newHints = countryData
            .filter(country => {
                return country.properties.ADMIN.substring(0, props.value.length).toLowerCase() === props.value.toLowerCase()   
            })
            .map(country => country.properties.ADMIN);
        setHints(newHints);
        setSelected(prev => {
            if (prev >= newHints.length - 1) {
                return newHints.length - 1;
            }
            return prev;
        });
    }, [props.value]);

    const submitSelected = () => {
        //@ts-ignore
        props.onChange({ currentTarget: { value: hints[selected] }});
    }

    const handleKeyDown: KeyboardEventHandler = (e) => {
        e.stopPropagation();
        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setSelected(prev => Math.min(++prev, Math.min(numHints, hints.length) - 1));
                break;
            case "ArrowUp":
                e.preventDefault();
                setSelected(prev => Math.max(--prev, 0));
                break;
            case "Enter":
                submitSelected();
                break;
            case "Tab":
                e.preventDefault();
                submitSelected();
                break;
            case "Escape":
                setOpen(false);
                break;
        }
    }

    const handleBlur: FocusEventHandler = e => {
        if (e.relatedTarget && e.relatedTarget.id.startsWith("country")) {
            submitSelected();
        }
        setOpen(false);
    }

    const getLiClasses = (selected: boolean) => {
        const base = "m-0 px-2 py-1";
        return selected ? "bg-blue-200 " + base : base;
    }

    return (
        <div
            className='relative w-full flex m-0' 
            onFocus={() => setOpen(true)}
            onBlur={handleBlur}
        >
            <input
                className="shadow px-2 py-1 md:py-0
                text-gray-700 dark:bg-slate-300 focus:outline-none 
                focus:shadow-outline disabled:bg-slate-400
                border rounded disabled:border-slate-400
                w-full top-0 left-0"
                type="text"
                name="guesser"
                id="guesser"
                value={props.value}
                onChange={props.onChange}
                onKeyDown={handleKeyDown}
                disabled={props.win}
                placeholder={props.guesses.length === 0 ? localeList[locale]["Game1"] : ""}
                autoComplete="new-password"
            />
            <ul 
                className='absolute bg-white shadow text-gray-700 top-8
                focus:shadow-outline border rounded mt-2 z-10 text-left cursor-pointer w-full'
                hidden={!open || props.value === ""}
            >
                {hints.map((country, index) => 
                    <li
                        className={getLiClasses(index === selected)}
                        key={country}
                        hidden={index >= numHints}
                        onMouseEnter={() => setSelected(index)}
                        tabIndex={0}
                        id={`country${index}`}
                    >
                        <span className="underline font-semibold">
                            {country.substring(0, props.value.length)}
                        </span>
                        {country.substring(props.value.length)}
                    </li>
                )}
            </ul>
        </div>
    )
}
