import $http from "./index";
import qs from 'qs'

export const login = (data) => $http({url:'/login',method:"post",data:qs.stringify(data)})

export const getArticleList = () => $http({url:'/getarticle',method:'get'})

export const getNewarticle = () => $http({url:'/getNewarticle',method:'get'})

export const getArticleById = (id) => $http({url:'/getById',method:'get',params:id})

export const getTypes = () => $http({url:'/getTypes',method:'get'})

export const getTableData = () => $http({url:'/getTableData',method:'get'})

export const DelArticleById = (id) => $http({url:'/DelById',method:'get',params:id})

export const addBlog = (data) => $http({url:'/addBlog',method:"post",data:qs.stringify(data)})

export const PubArticleById = (data) => $http({url:'/PubById',method:'get',params:data})

export const updateSecret = (data) => $http({url:'/updateMi',method:'get',params:data})

export const updateView = (data) => $http({url:'/updateView',method:'get',params:data})

export const updateBlog = (data) => $http({url:'/updateBlog',method:"post",data:qs.stringify(data)})

export const getByTitle = (title) => $http({url:'/getByTitle',method:'get',params:title})

export const getNotesList = () => $http({url:'/getNotesList',method:'get'})

export const getNotesById = (id) => $http({url:'/getNotesById',method:'get',params:id})

export const updateNoteView = (data) => $http({url:'/updateNoteView',method:'get',params:data})

export const getNotesData = () => $http({url:'/getNotesData',method:'get'})

export const PubNotesById = (data) => $http({url:'/PubNotesById',method:'get',params:data})

export const updateNotes = (data) => $http({url:'/updateNotes',method:"post",data:qs.stringify(data)})

export const addNote = (data) => $http({url:'/addNote',method:"post",data:qs.stringify(data)})

export const DelNotesById = (id) => $http({url:'/DelNotesById',method:'get',params:id})


