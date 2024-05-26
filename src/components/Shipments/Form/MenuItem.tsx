import React, { useEffect, useRef, useState } from 'react';
import {  UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Input } from '@/components/ui/input';

interface IMenuInput {
    elements:string[];
    type:"mean_transportation" | "origin_factory" | "destination_warehouse" | "driver" | "arrival_time";
    errorMessage:string | undefined; 
    InputType: string;
    Label: string;
    className?:string;
    setValue: UseFormSetValue<{
      origin_factory: string;
      destination_warehouse: string;
      driver: string;
      mean_transportation: string;
      arrival_time: string;
  }>
  register:UseFormRegister<{
    origin_factory: string;
    destination_warehouse: string;
    driver: string;
    mean_transportation: string;
    arrival_time: string;
  }>
  watch:UseFormWatch<{
    origin_factory: string;
    destination_warehouse: string;
    driver: string;
    mean_transportation: string;
    arrival_time: string;
  }>
  }
  export const MenuInput: React.FC<IMenuInput> = ({elements, type, errorMessage, InputType, Label, className, setValue,register, watch}) =>{
    const [Elements, setElements ] = useState(elements) 
    
    const handleFocus = () => {
      if(Dropref.current && Inputref.current)
        {
          Dropref.current.style.display = 'block'
          const inputRect = Inputref.current.getBoundingClientRect();
          Dropref.current.style.top = `${inputRect.bottom + window.scrollY}px`;
          Dropref.current.style.left = `${inputRect.left + window.scrollX}px`;
        }
    };
    
    const {ref, ...rest} = register(type);
    const eleInput = watch(type)
    
    useEffect(()=>{
      
      if(eleInput)
        {
        setElements(elements.filter(person => person.startsWith(eleInput.toString())));
        }
      else setElements(elements)
    }, [eleInput])
    const Dropref = useRef<null | HTMLDivElement>(null)
    const Inputref = useRef<null | HTMLInputElement>(null)
  
    const OptionEvent = (option: string): void => {
      setValue(type, option);
      if(Dropref.current)
      {
        Dropref.current.style.display = 'none';
      }
    }
  
    const handleClickOutside = (event: MouseEvent) => {
      if (
        Dropref.current &&
        !Dropref.current.contains(event.target as Node) &&
        Inputref.current &&
        !Inputref.current.contains(event.target as Node)
      ) {
        Dropref.current.style.display = 'none';
      }
    };
  
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
    
  
    return(<div className="space-y-1">
    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {Label}:
    </label>
    <Input    className={" rounded-sm ring-2 ring-gray-200 ".concat(className || '')} {...rest} type={InputType} placeholder={Label} onFocus={handleFocus} ref={(e) => {
  ref(e)
  Inputref.current = e 
  }}/>
  { type !== 'arrival_time' &&
    <div ref={Dropref} className=" hidden absolute z-50 max-h-48 overflow-y-auto mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
     {Elements.map((option) => (
      <button    type="button" onClick={()=> OptionEvent(option)} key={option} value={option}  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md hover:text-gray-900" role="menuitem">{option}</button>
    ))}
    </div>}
    
      <div className="text-red-500">{errorMessage}</div>
    
  </div>
  )
  }