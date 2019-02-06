import asyncio
from xknx import XKNX
from xknx.devices import Light

async def main():
    xknx = XKNX()
    
    await xknx.start()
    light = Light(xknx,
                  name='HelloWorldLight',
                  group_address_switch='1/0/9')
    await light.set_on()
    await asyncio.sleep(2)
    await light.set_off()
    await xknx.stop()


# pylint: disable=invalid-name
loop = asyncio.get_event_loop()
loop.run_until_complete(main())
loop.close()