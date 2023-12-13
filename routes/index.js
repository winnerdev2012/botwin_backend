import express from 'express'
import { addActionItem, addChainItem, getActionById, setActiveAction, setActiveChain, getScriptList, getBridgeList, updateActionItem, deleteSelectedItem, deleteChain, getActionListByChainId, getChainList } from '../controller/Products.js'

const router = express.Router()

router.get('/get_action_list/:id', getActionListByChainId)
router.get('/get_chain_list', getChainList)
router.get('/get_script_list', getScriptList)
router.get('/get_bridge_list', getBridgeList)
router.get('/get_action_item/:id', getActionById)
router.post('/add_action_item', addActionItem)
router.post('/add_chain_item', addChainItem)
router.patch('/update_action_item/:id', updateActionItem)
router.patch('/set_avtive_action', setActiveAction)
router.patch('/set_avtive_chain', setActiveChain)
router.delete('/delete_selected_item/:id', deleteSelectedItem)
router.delete('/delete_chain/:id', deleteChain)

export default router