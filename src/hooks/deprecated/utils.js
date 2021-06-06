/**
 *
 * @param {string} id
 * @returns
 */

export function createRootElement(id) {
  return document.createElement('div').setAttribute('id', id)
}

/**
 *
 * @param {*} root
 */

export function addRootElement(root) {
  document.body.insertBefore(
    root,
    document.body.lastElementChild.nextElementSibling
  )
}
