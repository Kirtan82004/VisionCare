"use client"

import type React from "react"

import { createContext, useContext, useReducer, type ReactNode } from "react"

// Global State Types
interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin"
}

interface Product {
  id: string
  name: string
  brand: string
  price: number
  image: string
  category: "glasses" | "sunglasses" | "lenses"
  frameShape: string
  color: string
  description: string
  specifications: Record<string, string>
}

interface CartItem {
  product: Product
  quantity: number
}

interface Appointment {
  id: string
  date: string
  time: string
  service: string
  status: "pending" | "confirmed" | "cancelled"
}

interface AppState {
  user: User | null
  products: Product[]
  cart: CartItem[]
  appointments: Appointment[]
  isLoading: boolean
}

type AppAction =
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_CART_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "ADD_APPOINTMENT"; payload: Appointment }
  | { type: "SET_LOADING"; payload: boolean }

const initialState: AppState = {
  user: null,
  products: [],
  cart: [],
  appointments: [],
  isLoading: false,
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload }
    case "SET_PRODUCTS":
      return { ...state, products: action.payload }
    case "ADD_TO_CART":
      const existingItem = state.cart.find((item) => item.product.id === action.payload.id)
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.product.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        }
      }
      return {
        ...state,
        cart: [...state.cart, { product: action.payload, quantity: 1 }],
      }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.product.id !== action.payload),
      }
    case "UPDATE_CART_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item,
        ),
      }
    case "CLEAR_CART":
      return { ...state, cart: [] }
    case "ADD_APPOINTMENT":
      return {
        ...state,
        appointments: [...state.appointments, action.payload],
      }
    case "SET_LOADING":
      return { ...state, isLoading: action.payload }
    default:
      return state
  }
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

export function Providers({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within Providers")
  }
  return context
}
