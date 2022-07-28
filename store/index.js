

export const state = () => {
    workid:[]
    partner:''
    knowledgeArea: ''
    
  }
  
  
  export const mutations = {
    getWorkId(state, payload){
      state.workid = payload
    },
    getName(state, payload){
      state.partner = payload
    },
    getKA(state, payload){
      state.knowledgeArea = payload
    }

  }