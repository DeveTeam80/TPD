// components/ModalRegions.tsx
'use client'

import RegionCard from '@/components/RegionCard'
import { Button } from '@/shared/Button'
import { Dialog, DialogActions, DialogBody, DialogTitle } from '@/shared/dialog'
import { Divider } from '@/shared/divider'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { Location01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { FC, useState } from 'react'

interface Props {
  regions: any[]
}

const ModalRegions: FC<Props> = ({ regions }) => {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <div className="modal-regions">
      <Button type="button" color="white" onClick={() => setIsOpen(true)}>
        <HugeiconsIcon icon={Location01Icon} size={24} />
        <span>Regions</span>
        <ChevronDownIcon className="size-4" />
      </Button>
      <Dialog size="5xl" open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Browse by Region</DialogTitle>
        <DialogBody>
          <Divider className="my-6" />
          <div className="grid gap-6 sm:grid-cols-2 sm:py-2 md:grid-cols-3 md:gap-8 lg:grid-cols-4">
            {regions.map((region) => (
              <RegionCard key={region.id} region={region} />
            ))}
          </div>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ModalRegions