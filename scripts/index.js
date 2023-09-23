import {world, system, EquipmentSlot} from '@minecraft/server';

const TICKS_PER_SECOND = 20;
const RUN_INTERVAL_SECONDS = 1;

system.runInterval(() => {
    world.getAllPlayers().forEach((player) => {
        /**
         * @type {import('@minecraft/server').EntityEquippableComponent}
         */
        const inventory = player.getComponent('minecraft:equippable');
        const equipment = inventory.getEquipment(EquipmentSlot.Mainhand);

        // if not holding anything return
        if (!equipment) {
            return;
        }

        const isHoldingCompass = equipment.typeId === 'minecraft:compass';
        if (isHoldingCompass) {
            const {x, y, z} = player.location;
            player.onScreenDisplay.setActionBar(`coords: x:${x|0}, y:${y|0}, z:${z|0}`);
            return;
        }
    });
}, TICKS_PER_SECOND * RUN_INTERVAL_SECONDS);