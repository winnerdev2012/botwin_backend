import express from 'express'
import { addActionItem, getActionById, getScriptList, getBridgeList, updateActionItem, deleteSelectedItem, getActionListByChainId, getChainList } from '../controller/Products.js'

const router = express.Router()

router.get('/get_action_list/:id', getActionListByChainId)
router.get('/get_chain_list', getChainList)
router.get('/get_script_list', getScriptList)
router.get('/get_bridge_list', getBridgeList)
router.get('/get_action_item/:id', getActionById)
router.post('/add_action_item', addActionItem)
router.patch('/update_action_item/:id', updateActionItem)
router.delete('/delete_selected_item/:id', deleteSelectedItem)

export default router