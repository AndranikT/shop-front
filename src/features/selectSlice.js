import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {setHeaders, url} from "./api";


const initialState = {
    allProducts : [],
    filterProducts : [],
    filterProductsIsNotFound : [],
    status : null,
    locationFilter : [],
    brandFilter : [],
    modelFilter : [],
    colorFilter : [],
    storageFilter : [],
    priceFilterMin : [],
    priceFilterMax : [],
    searchFilter : []
}
export const productsFilterFetch = createAsyncThunk(
    "filter/productsFilterFetch",
    async ()=>{
        try{
            const response = await axios.put(`${url}/products/type`, {
                typeOfProduct : "mobile"
            })
            return response.data
        }catch(err){
            console.log("error", err)
        }
    })

export const selectFilter = createSlice({
        name: "filter",
        initialState,
        reducers: {
            filterLocation: (state, action) => {
                let filterData = []
                if (action.payload !== "") {
                    if (state.locationFilter.length === 0) {
                        if (state.filterProducts.length > 0) {
                            filterData = state.filterProducts.filter((product) => {
                                return product.location === action.payload
                            })
                        } else {
                            filterData = state.allProducts.filter((product) => {
                                return product.location === action.payload
                            })
                        }
                    } else if (state.locationFilter.length > 0) {
                        filterData = state.allProducts.filter((product) => {
                            return product.location === action.payload
                        })
                        if (state.brandFilter.length > 0) {
                            filterData = filterData.filter((product) => {
                                return product.brand === state.brandFilter[0].brand
                            })
                            if (state.modelFilter.length > 0) {
                                filterData = filterData.filter((product) => {
                                    return product.model === state.modelFilter[0].model
                                })
                            }
                        }
                        if (state.colorFilter.length > 0) {
                            filterData = filterData.filter((product) => {
                                return product.color === state.colorFilter[0].color
                            })
                        }
                        if (state.storageFilter.length > 0) {
                            filterData = filterData.filter((product) => {
                                return product.storage === state.storageFilter[0].storage
                            })
                        }
                    }
                    if (filterData.length > 0) {
                        state.locationFilter = filterData;
                        state.filterProducts = filterData
                        state.filterProductsIsNotFound = []
                    } else {
                        state.locationFilter = filterData;
                        state.filterProducts = [];
                        state.filterProductsIsNotFound = [{type: "not-found"}]
                    }
                } else {
                    state.filterProducts = []
                    state.locationFilter = []
                    state.brandFilter = []
                    state.modelFilter = []
                    state.colorFilter = []
                    state.priceFilter = []
                }
            },
            filterBrand: (state, action) => {
                let filterData = [];
                if (action.payload !== "") {
                    if (state.brandFilter.length === 0) {
                        if (state.filterProducts.length > 0) {
                            filterData = state.filterProducts.filter((product) => {
                                return product.brand === action.payload
                            })
                        } else {
                            filterData = state.allProducts.filter((product) => {
                                return product.brand === action.payload
                            })
                        }
                    }
                    else if (state.brandFilter.length > 0) {
                        filterData = state.allProducts.filter((product) => {
                            return product.brand === action.payload
                        })
                        if (state.locationFilter.length > 0) {
                            filterData = filterData.filter((product) => {
                                return product.location === state.locationFilter[0].location
                            })
                        }
                        if (state.colorFilter.length > 0) {
                            filterData = filterData.filter((product) => {
                                return product.color === state.colorFilter[0].color
                            })
                        }
                        if (state.storageFilter.length > 0) {
                            filterData = filterData.filter((product) => {
                                return product.storage === state.storageFilter[0].storage
                            })
                        }
                    }
                    if (filterData.length > 0) {
                        state.brandFilter = filterData;
                        state.modelFilter = [];
                        state.filterProducts = filterData;
                        state.filterProductsIsNotFound = [];
                    } else {
                        state.brandFilter = [];
                        state.modelFilter = [];
                        state.filterProducts = [];
                        state.filterProductsIsNotFound = [{type: "not-found"}]
                    }
                } else {
                    if (state.locationFilter.length > 0) {
                        filterData = state.allProducts.filter((product) => {
                            return product.location === state.locationFilter[0].location
                        })
                    }
                    if (state.colorFilter.length > 0) {
                        if (filterData.length > 0) {
                            filterData = filterData.filter((product) => {
                                return product.color === state.colorFilter[0].color;
                            })
                        } else {
                            filterData = state.allProducts.filter((product) => {
                                return product.color === state.colorFilter[0].color
                            })
                        }
                    }
                    if (state.storageFilter.length > 0) {
                        if (filterData.length > 0) {
                            filterData = filterData.filter((product) => {
                                return product.storage === state.storageFilter[0].storage
                            })
                        } else {
                            filterData = state.allProducts.filter((product) => {
                                return product.storage === state.storageFilter[0].storage
                            })
                        }
                    }
                    if (filterData.length > 0) {
                        state.brandFilter = [];
                        state.modelFilter = [];
                        state.filterProducts = filterData;
                        state.filterProductsIsNotFound = [];
                    } else {
                        state.brandFilter = [];
                        state.modelFilter = [];
                        state.filterProducts = [];
                        state.filterProductsIsNotFound = [];
                    }
                }
            },
            filterModel: (state, action) => {
                let filterData = [];
                if (action.payload !== "") {
                    if (state.modelFilter.length === 0) {
                        filterData = state.brandFilter.filter((product) => {
                            return product.model === action.payload;
                        })
                    } else if (state.modelFilter.length > 0) {
                        filterData = state.brandFilter.filter((product) => {
                            return product.model === action.payload
                        })
                        if (state.locationFilter.length > 0) {
                            filterData = filterData.filter((product) => {
                                return product.location === state.locationFilter[0].location
                            })
                        }
                        if (state.colorFilter.length > 0) {
                            filterData = filterData.filter((product) => {
                                return product.color === state.colorFilter[0].color
                            })
                        }
                        if (state.storageFilter.length > 0) {
                            filterData = filterData.filter((product) => {
                                return product.storage === state.storageFilter[0].storage
                            })
                        }
                    }
                    if (filterData.length > 0) {
                        state.modelFilter = filterData;
                        state.filterProducts = filterData;
                        state.filterProductsIsNotFound = [];
                    } else {
                        state.modelFilter = [];
                        state.filterProducts = [];
                        state.filterProductsIsNotFound = [{type: "not-found"}]
                    }
                }
                else {
                    filterData = state.allProducts.filter((product) => {
                        return product.brand === state.brandFilter[0]?.brand
                    })
                    if (state.locationFilter.length > 0) {
                        filterData = filterData.filter((product) => {
                            return product.location === state.locationFilter[0].location
                        })
                    }
                    if (state.colorFilter.length > 0) {
                        filterData = filterData.filter((product) => {
                            return product.color === state.colorFilter[0].color
                        })
                    }
                    if (state.storageFilter.length > 0) {
                        filterData = filterData.filter((product) => {
                            return product.storage === state.storageFilter[0].storage
                        })
                    }
                    if (filterData.length > 0) {
                        state.modelFilter = []
                        state.filterProducts = filterData;
                        state.filterProductsIsNotFound = [];
                    } else {
                        state.modelFilter = [];
                        state.filterProducts = state.brandFilter
                        state.filterProductsIsNotFound = []
                    }
                }
            },
            filterColor: (state, action) => {
                let filterData = [];
                if (action.payload !== "") {
                    if (state.colorFilter.length === 0) {
                        if (state.filterProducts.length > 0) {
                            filterData = state.filterProducts.filter((product) => {
                                return product.color === action.payload
                            })
                        } else {
                            filterData = state.allProducts.filter((product) => {
                                return product.color === action.payload
                            })
                        }
                    } else if (state.colorFilter.length > 0) {
                        filterData = state.allProducts.filter((product) => {
                            return product.color === action.payload
                        })
                        if (state.locationFilter.length > 0) {
                            filterData = filterData.filter((product) => {
                                return product.location === state.locationFilter[0].location
                            })
                        }
                        if (state.brandFilter.length > 0) {
                            filterData = filterData.filter((product) => {
                                return product.brand === state.brandFilter[0].brand
                            })
                            if (state.modelFilter.length > 0) {
                                filterData = filterData.filter((product) => {
                                    return product.model === state.modelFilter[0].model
                                })
                            }
                        }
                        if (state.storageFilter.length > 0) {
                            filterData = filterData.filter((product) => {
                                return product.storage === state.storageFilter[0].storage
                            })
                        }
                    }
                    if (filterData.length > 0) {
                        state.colorFilter = filterData;
                        state.filterProducts = filterData;
                        state.filterProductsIsNotFound = []
                    } else {
                        state.colorFilter = []
                        state.filterProducts = []
                        state.filterProductsIsNotFound = [{type: "not-found"}]
                    }
                } else {
                    if (state.locationFilter.length > 0) {
                        filterData = filterData.filter((product) => {
                            return product.location === state.locationFilter[0].location
                        })
                    }
                    if (state.brandFilter.length > 0) {
                        if (filterData.length > 0) {
                            filterData = filterData.filter((product) => {
                                return product.brand === state.brandFilter[0].brand
                            })
                        }
                        filterData = state.allProducts.filter((product) => {
                            return product.brand === state.brandFilter[0].brand
                        })
                        if (state.modelFilter.length > 0) {
                            filterData = filterData.filter((product) => {
                                return product.model === state.modelFilter[0].model
                            })
                        }
                    }
                    if (state.storageFilter.length > 0) {
                        if (filterData.length > 0) {
                            filterData = filterData.filter((product) => {
                                return product.storage === state.storageFilter[0].storage
                            })
                        } else {
                            filterData = state.allProducts.filter((product) => {
                                return product.storage === state.storageFilter[0].storage
                            })
                        }
                    }
                    if (filterData.length > 0) {
                        state.colorFilter = [];
                        state.filterProducts = filterData;
                        state.filterProductsIsNotFound = [];
                    } else {
                        state.colorFilter = [];
                        state.filterProducts = [];
                        state.filterProductsIsNotFound = [];
                    }
                }
            },
            filterStorage: (state, action) => {
                let filterData = [];
                if (action.payload !== "") {
                    if (state.storageFilter.length === 0) {
                        if (state.filterProducts.length > 0) {
                            filterData = state.filterProducts.filter((product) => {
                                return product.storage === action.payload
                            })
                        } else {
                            filterData = state.allProducts.filter((product) => {
                                return product.storage === action.payload
                            })
                        }
                    } else if (state.storageFilter.length > 0) {
                        filterData = state.allProducts.filter((product) => {
                            return product.storage === action.payload
                        })
                        if (state.locationFilter.length > 0) {
                            filterData = filterData.filter((product) => {
                                return product.location === state.locationFilter[0].location
                            })
                        }
                        if (state.brandFilter.length > 0) {
                            filterData = filterData.filter((product) => {
                                return product.brand === state.brandFilter[0].brand
                            })
                            if (state.modelFilter.length > 0) {
                                filterData = filterData.filter((product) => {
                                    return product.model === state.modelFilter[0].model
                                })
                            }
                        }
                        if (state.colorFilter.length > 0) {
                            filterData = filterData.filter((product) => {
                                return product.color === state.colorFilter[0].color
                            })
                        }
                    }
                    if (filterData.length > 0) {
                        state.storageFilter = filterData
                        state.filterProducts = filterData;
                        state.filterProductsIsNotFound = [];
                    } else {
                        state.storageFilter = filterData;
                        state.filterProducts = [];
                        state.filterProductsIsNotFound = [{type: "not-found"}];

                    }
                } else {
                    if (state.locationFilter.length > 0) {
                        filterData = state.allProducts.filter((product) => {
                            return product.location === state.locationFilter[0].location
                        })
                    }
                    if (state.brandFilter.length > 0) {
                        if (filterData.length > 0) {
                            filterData = filterData.filter((product) => {
                                return product.brand === state.brandFilter[0].brand
                            })
                        } else {
                            filterData = state.allProducts.filter((product) => {
                                return product.brand === state.brandFilter[0].color
                            })
                        }
                        if (state.modelFilter.length > 0) {
                            filterData = filterData.filter((product) => {
                                return product.model === state.modelFilter[0].brand
                            })
                        }
                    }
                    if (state.colorFilter.length > 0) {
                        if (filterData.length > 0) {
                            filterData = filterData.filter((product) => {
                                return product.color === state.colorFilter[0].color;
                            })
                        } else {
                            filterData = state.allProducts.filter((product) => {
                                return product.color === state.colorFilter[0].color
                            })
                        }

                    }
                    if (filterData.length > 0) {
                        state.storageFilter = []
                        state.filterProducts = filterData;
                        state.filterProductsIsNotFound = [];
                    } else {
                        state.storageFilter = []
                        state.filterProducts = [];
                        state.filterProductsIsNotFound = [];
                    }
                }
            },
            filterPriceMin: (state, action) => {
                let filterData = []
                if (action.payload !== "") {
                    if (state.priceFilterMin.length === 0) {
                        if (state.filterProducts.length === 0) {
                            filterData = state.filterProducts.filter((product) => {
                                return product.price >= action.payload
                            })
                        } else {
                            filterData = state.allProducts.filter((product) => {
                                return product.price >= action.payload
                            })
                        }
                    } else if (state.priceFilterMin.length > 0) {
                        filterData = state.allProducts.filter((product) => {
                            return product.price >= action.payload
                        })
                        if (state.locationFilter.length > 0) {
                            filterData = filterData.filter((product) => {
                                return product.location === state.locationFilter[0].location
                            })
                        }
                        if (state.brandFilter.length > 0) {
                            filterData = filterData.filter((product) => {
                                return product.brand === state.brandFilter[0].brand
                            })
                            if (state.modelFilter.length > 0) {
                                filterData = filterData.filter((product) => {
                                    return product.model === state.modelFilter[0].model
                                })
                            }
                        }
                        if (state.colorFilter.length > 0) {
                            filterData = filterData.filter((product) => {
                                return product.color === state.colorFilter[0].color
                            })
                        }
                        if (state.storageFilter.length > 0) {
                            filterData = filterData.filter((product) => {
                                return product.storage === state.storageFilter[0].storage
                            })
                        }
                    }
                    if (filterData.length > 0) {
                        state.priceFilterMin = filterData
                        state.filterProducts = filterData
                        state.filterProductsIsNotFound = []
                    } else {
                        state.priceFilterMin = []
                        state.filterProducts = []
                        state.filterProductsIsNotFound = [{type: "not-found"}]
                    }
                } else {
                    if (state.locationFilter.length > 0) {
                        filterData = state.allProducts.filter((product) => {
                            return product.location === state.locationFilter[0].location
                        })
                    }
                    if (state.brandFilter.length > 0) {
                        if (filterData.length > 0) {
                            filterData = filterData.filter((product) => {
                                return product.brand === state.brandFilter[0].brand
                            })
                        } else {
                            filterData = state.allProducts.filter((product) => {
                                return product.brand === state.brandFilter[0].color
                            })
                        }
                        if (state.modelFilter.length > 0) {
                            filterData = filterData.filter((product) => {
                                return product.model === state.modelFilter[0].brand
                            })
                        }
                    }
                    if (state.colorFilter.length > 0) {
                        if (filterData.length > 0) {
                            filterData = filterData.filter((product) => {
                                return product.color === state.colorFilter[0].color;
                            })
                        } else {
                            filterData = state.allProducts.filter((product) => {
                                return product.color === state.colorFilter[0].color
                            })
                        }

                    }
                }
                if (filterData.length > 0) {
                    state.priceFilterMin = []
                    state.filterProducts = filterData
                    state.filterProductsIsNotFound = []
                } else {
                    state.priceFilterMin = []
                    state.filterProducts = []
                    state.filterProductsIsNotFound = []
                }
            },
            filterPriceMax: (state, action) => {
                let filterData = []
                if (action.payload !== "") {
                    if (state.priceFilterMax.length === 0) {
                        if (state.filterProducts.length > 0) {
                            filterData = state.filterProducts.filter((product) => {
                                return product.price <= action.payload
                            })
                        } else {
                            filterData = state.allProducts.filter((product) => {
                                return product.price <= action.payload
                            })
                        }
                    } else if (state.priceFilterMax.length > 0) {
                        filterData = state.allProducts.filter((product) => {
                            return product.price <= action.payload
                        })
                        if (state.locationFilter.length > 0) {
                            filterData = filterData.filter((product) => {
                                return product.location === state.locationFilter[0].location
                            })
                        }
                        if (state.brandFilter.length > 0) {
                            filterData = filterData.filter((product) => {
                                return product.brand === state.brandFilter[0].brand
                            })
                            if (state.modelFilter.length > 0) {
                                filterData = filterData.filter((product) => {
                                    return product.model === state.modelFilter[0].model
                                })
                            }
                        }
                        if (state.colorFilter.length > 0) {
                            filterData = filterData.filter((product) => {
                                return product.color === state.colorFilter[0].color
                            })
                        }
                        if (state.storageFilter.length > 0) {
                            filterData = filterData.filter((product) => {
                                return product.storage === state.storageFilter[0].storage
                            })
                        }
                    }
                    if (filterData.length > 0) {
                        state.priceFilterMax = filterData
                        state.filterProducts = filterData
                        state.filterProductsIsNotFound = []
                    } else {
                        state.priceFilterMax = []
                        state.filterProducts = []
                        state.filterProductsIsNotFound = [{type: "not-found"}]
                    }
                } else {
                    if (state.locationFilter.length > 0) {
                        filterData = state.allProducts.filter((product) => {
                            return product.location === state.locationFilter[0].location
                        })
                    }
                    if (state.brandFilter.length > 0) {
                        if (filterData.length > 0) {
                            filterData = filterData.filter((product) => {
                                return product.brand === state.brandFilter[0].brand
                            })
                        } else {
                            filterData = state.allProducts.filter((product) => {
                                return product.brand === state.brandFilter[0].color
                            })
                        }
                        if (state.modelFilter.length > 0) {
                            filterData = filterData.filter((product) => {
                                return product.model === state.modelFilter[0].brand
                            })
                        }
                    }
                    if (state.colorFilter.length > 0) {
                        if (filterData.length > 0) {
                            filterData = filterData.filter((product) => {
                                return product.color === state.colorFilter[0].color;
                            })
                        } else {
                            filterData = state.allProducts.filter((product) => {
                                return product.color === state.colorFilter[0].color
                            })
                        }

                    }
                }
                if (filterData.length > 0) {
                    state.priceFilterMin = []
                    state.filterProducts = filterData
                    state.filterProductsIsNotFound = []
                } else {
                    state.priceFilterMin = []
                    state.filterProducts = []
                    state.filterProductsIsNotFound = []
                }
            },
            removeFilterProducts: (state) => {
                state.locationFilter = []
                state.brandFilter = []
                state.modelFilter = []
                state.colorFilter = []
                state.storageFilter = []
                state.priceFilterMin = []
                state.priceFilterMax = []
                state.filterProducts = []
                state.filterProductsIsNotFound = []

            },
            filterSearchProducts: (state, action) => {
                let filterData;
                if (action.payload !== [] ) {
                    if (state.filterProducts.length > 0) {
                        filterData = state.filterProducts.filter((product) => {
                            return (
                                action.payload &&
                                product &&
                                product.name &&
                                product.name.toLowerCase().includes(action.payload)
                            )
                        })
                    }
                    else if (state.filterProducts.length === 0) {
                        filterData = state.allProducts.filter((product) => {
                            return (
                                action.payload &&
                                product &&
                                product.name &&
                                product.name.toLowerCase().includes(action.payload)
                            )
                        })
                    }
                    if (filterData.length > 0) {
                        state.searchFilter = filterData
                        state.filterProducts = filterData
                        state.filterProductsIsNotFound = []
                    } else {
                        state.searchFilter = []
                        state.filterProductsIsNotFound = [{type: "not-found"}]
                    }
                }
            },
            filterProductRenderIsLike: (state, action) => {
                const { userId, productId} = action.payload
                let filterData = [];
                let update = [] ;
                if( state.filterProducts.length > 0 ){
                    update = state.filterProducts.filter((product)=> {
                        return product._id === productId
                    })
                    update[0].isLike.push(userId)
                    filterData = state.filterProducts.map((product)=> product._id === productId ? update[0]: product )
                    state.filterProducts = filterData;
                }
            },
            filterProductRenderDisLike :(state, action)=>{
                const {userId, productId} = action.payload
                let filterData = [] ;
                let update = [] ;
                let updateIsLike = [] ;
                if(state.filterProducts.length > 0){
                    update = state.filterProducts.filter((product)=>{
                        return product._id === productId
                    })
                    updateIsLike = update[0].isLike.filter((id)=>{
                        return id !== userId
                    })
                    update[0].isLike = updateIsLike
                    filterData = state.filterProducts.map((product)=> product._id === productId ? update[0]: product )
                    state.filterProducts = filterData;
                }
            }
        },
        extraReducers: {
            [productsFilterFetch.pending]: (state, ) => {
                state.status = "pending";
            },
            [productsFilterFetch.fulfilled]: (state, action) => {
                state.allProducts = action.payload;
                state.status = "success";
            },
            [productsFilterFetch.rejected]: (state, ) => {
                state.status = "rejected";
            },
        }
    })
    export const { filterLocation , filterBrand, filterModel , filterColor, filterStorage, filterPriceMin, filterPriceMax, removeFilterProducts, filterSearchProducts, filterProductRenderIsLike, filterProductRenderDisLike} =  selectFilter.actions
    export default selectFilter.reducer