export interface Brands {
  image: any
  images: any
  name: any
    results: number
    metadata: Metadata
    data: Brands[]
  }
  
  export interface Metadata {
    currentPage: number
    numberOfPages: number
    limit: number
    nextPage: number
  }
  
  export interface DataBrand {
    _id: string
    name: string
    slug: string
    image: string
    createdAt: string
    updatedAt: string
  }
  