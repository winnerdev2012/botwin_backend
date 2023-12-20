import express from 'express'
import {
    addActionItem,
    addChainItem,
    addBridgeItem,
    addBridgeJoin,

    updateActionItem,
    updateActiveAction,
    updateActiveChain,
    updateMaxActionCount,
    updateMaxChainCount,
    updateBridge,
    updateChain,
    
    getActionById,
    getScriptList,
    getAvailableBridge,
    getChainListByBridgeList,
    getBridgeList,
    getChainList2,
    getActionListByChainId,
    getChainList,

    deleteSelectedItem,
    deleteChain,
    deleteBridge,
    deleteChainFromBridge
} from '../controller/Products.js'

const router = express.Router()

router.get('/get_action_list/:id', getActionListByChainId)
router.get('/get_chain_list', getChainList)
router.get('/get_chain_list2/:id', getChainList2)
router.get('/get_script_list', getScriptList)
router.get('/get_bridge_list', getBridgeList)
router.get('/get_action_item/:id', getActionById)
router.get('/get_available_bridge/:id', getAvailableBridge)
router.get('/get_chain_list_by_bridge/:id', getChainListByBridgeList)

router.post('/add_action_item', addActionItem)
router.post('/add_chain_item', addChainItem)
router.post('/add_bridge_item', addBridgeItem)
router.post('/add_bridge_join', addBridgeJoin)

router.patch('/update_action_item/:id', updateActionItem)
router.patch('/update_Bridge', updateBridge)
router.patch('/update_chain_item', updateChain)
router.patch('/update_active_action', updateActiveAction)
router.patch('/update_active_chain', updateActiveChain)
router.patch('/update_max_action_count', updateMaxActionCount)
router.patch('/update_max_chain_count', updateMaxChainCount)

router.delete('/delete_selected_item/:id', deleteSelectedItem)
router.delete('/delete_chain/:id', deleteChain)
router.delete('/delete_bridge/:id', deleteBridge)
router.delete('/delete_chain_from_bridge', deleteChainFromBridge)

export default router